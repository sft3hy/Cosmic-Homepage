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
        req.on('data', (chunk: any) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const { title, description, iconName, urlPath } = JSON.parse(body);
            const linksPath = path.resolve(__dirname, './public/links.json');
            let links = JSON.parse(fs.readFileSync(linksPath, 'utf8'));

            links.push({
              title,
              description,
              iconName,
              url: `https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/${urlPath}`
            });

            fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
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

    server.middlewares.use('/api/delete-link', (req: any, res: any, next: any) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const { title } = JSON.parse(body);
            const linksPath = path.resolve(__dirname, './public/links.json');
            let links = JSON.parse(fs.readFileSync(linksPath, 'utf8'));

            links = links.filter((l: any) => l.title !== title);

            fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
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
    apiPlugin()
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
