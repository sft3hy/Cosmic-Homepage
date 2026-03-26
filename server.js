import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

// In production, the links.json will be in the static folder (dist)
// We need to move it to a persistent location if we want it to survive container restarts,
// but for now we'll write to the public path in the dist folder.
const LINKS_PATH = path.join(__dirname, 'dist', 'links.json');

// API to add a link
app.post('/api/add-link', (req, res) => {
  try {
    const { title, description, iconName, urlPath } = req.body;
    let links = JSON.parse(fs.readFileSync(LINKS_PATH, 'utf8'));
    
    links.push({
      title,
      description,
      iconName,
      url: `https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/${urlPath}`
    });
    
    fs.writeFileSync(LINKS_PATH, JSON.stringify(links, null, 2));
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// API to delete a link
app.post('/api/delete-link', (req, res) => {
  try {
    const { title } = req.body;
    let links = JSON.parse(fs.readFileSync(LINKS_PATH, 'utf8'));
    
    links = links.filter(l => l.title !== title);
    
    fs.writeFileSync(LINKS_PATH, JSON.stringify(links, null, 2));
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
