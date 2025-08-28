import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import express from 'express';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';
import { Request, Response } from 'express';

// Set global options for all functions
setGlobalOptions({ region: 'us-central1' });

const app = express();
// In Firebase Functions, files are uploaded to the functions directory
const distFolder = join(__dirname, '../dist/cuac-design');
const browserDistFolder = join(distFolder, 'browser');

console.log('Function starting. PWD:', process.cwd());
console.log('__dirname:', __dirname);
console.log('browserDistFolder:', browserDistFolder);

// Serve static files from browser dist folder
app.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
}));

// Handle all other requests by serving the SPA index.html
app.use((req: Request, res: Response) => {
  try {
    console.log('Request received for:', req.url);
    
    // Try to serve index.csr.html first (for SPA), then fallback to index.html
    const indexCsrPath = join(browserDistFolder, 'index.csr.html');
    const indexPath = join(browserDistFolder, 'index.html');
    
    console.log('Checking paths:');
    console.log('indexCsrPath exists:', existsSync(indexCsrPath));
    console.log('indexPath exists:', existsSync(indexPath));
    
    let indexHtml: string;
    if (existsSync(indexCsrPath)) {
      console.log('Using index.csr.html');
      indexHtml = readFileSync(indexCsrPath, 'utf-8');
    } else if (existsSync(indexPath)) {
      console.log('Using index.html');
      indexHtml = readFileSync(indexPath, 'utf-8');
    } else {
      console.log('No index files found');
      res.status(404).send('App not found');
      return;
    }
    
    console.log('Sending HTML response');
    res.send(indexHtml);
  } catch (error) {
    console.error('Error serving app:', error);
    res.status(500).send('Internal Server Error');
  }
});

export const ssr = onRequest(app);