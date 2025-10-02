// scripts/copy-assets.cjs
// Copies books and events markdown files to dist for deployment

const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(path.join(__dirname, '../books'), path.join(__dirname, '../dist/books'));
copyDir(path.join(__dirname, '../events'), path.join(__dirname, '../dist/events'));
copyDir(path.join(__dirname, '../notes'), path.join(__dirname, '../dist/notes'));
