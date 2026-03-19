import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import fs from "fs"

const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server: any) {
    server.middlewares.use('/api/add-link', (req: any, res: any, next: any) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            let { title, description, iconName, urlPath } = JSON.parse(body);
            
            // Basic PascalCase conversion for common mistakes (e.g. 'fullscreen' -> 'Fullscreen')
            if (iconName && typeof iconName === 'string') {
              iconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
            }

            const homeTsxPath = path.resolve(__dirname, './src/pages/Home.tsx');
            let content = fs.readFileSync(homeTsxPath, 'utf8');

            const newLink = `\n  {\n    title: ${JSON.stringify(title)},\n    description: ${JSON.stringify(description)},\n    iconName: ${JSON.stringify(iconName)},\n    url: ${JSON.stringify("https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/" + urlPath)},\n  },`;
            
            content = content.replace('const links = [', `const links = [${newLink}`);
            fs.writeFileSync(homeTsxPath, content);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.toString() }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    apiPlugin(),
    {
      name: 'api-delete-plugin',
      configureServer(server: any) {
        server.middlewares.use('/api/delete-link', (req: any, res: any, next: any) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk: any) => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const { title } = JSON.parse(body);
                const homeTsxPath = path.resolve(__dirname, './src/pages/Home.tsx');
                let content = fs.readFileSync(homeTsxPath, 'utf8');

                // Escape title for regex
                const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // Regex matches spacing + { + spacing + title: "Title" + any content up to next },
                const regex = new RegExp(`\\s*{\\s*title:\\s*"${escapedTitle}"[\\s\\S]*?},`);
                content = content.replace(regex, '');

                fs.writeFileSync(homeTsxPath, content);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.toString() }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    strictPort: true,
    port: 80,
    // Allow this host (your ELB hostname)
    allowedHosts: [
      'localhost',
      'test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com'
    ],
  },
})
