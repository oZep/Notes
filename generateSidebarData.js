// generateSidebarData.js (ESM)
// Scans books/ and events/ for .md files, notes/ for .pdf files, and outputs sidebar data as sidebarData.json
// Also generates HTML pages for each file in public/pages

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksDir = path.join(__dirname, 'books');
const eventsDir = path.join(__dirname, 'events');
const notesDir = path.join(__dirname, 'notes');
const outputFile = path.join(__dirname, 'src', 'sidebarData.json');
const htmlOutDir = path.join(__dirname, 'public', 'pages');
if (!fs.existsSync(htmlOutDir)) fs.mkdirSync(htmlOutDir, { recursive: true });

function mdToHtml(md) {
  // Very basic markdown to HTML (headings, lists, links, code)
  return md
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
    .replace(/\n- (.*?)(?=\n|$)/g, '<li>$1</li>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br>');
}

function getMarkdownMetadataAndHtml(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : path.basename(filePath);
  const htmlFile = path.basename(filePath, '.md') + '.html';
  const htmlPath = path.join(htmlOutDir, htmlFile);
  const htmlContent = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>${title}</title>\n</head>\n<body>\n${mdToHtml(content)}\n</body>\n</html>`;
  fs.writeFileSync(htmlPath, htmlContent);
  return {
    file: path.basename(filePath),
    title,
    html: `pages/${htmlFile}`
  };
}

function getPdfMetadata(filePath) {
  // Just link to the PDF file in notes
  return {
    file: path.basename(filePath),
    title: path.basename(filePath, '.pdf'),
    html: `notes/${path.basename(filePath)}`
  };
}

function scanDir(dir, ext, metaFn) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(ext))
    .map(f => metaFn(path.join(dir, f)));
}

const books = scanDir(booksDir, '.md', getMarkdownMetadataAndHtml);
const events = scanDir(eventsDir, '.md', getMarkdownMetadataAndHtml);
const notes = scanDir(notesDir, '.pdf', getPdfMetadata);

const sidebarData = { books, events, notes };

fs.writeFileSync(outputFile, JSON.stringify(sidebarData, null, 2));
console.log('Sidebar data and HTML pages generated.');
