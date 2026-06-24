const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function replaceColors(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace slate with surface
  content = content.replace(/slate-/g, 'surface-');
  // Replace gray with surface
  content = content.replace(/gray-/g, 'surface-');
  
  // Replace text-white with text-surface-50 (but avoid replacing white inside other words)
  content = content.replace(/\btext-white\b/g, 'text-surface-50');
  content = content.replace(/\bbg-white\/5\b/g, 'bg-surface-800/50');
  content = content.replace(/\bbg-white\/10\b/g, 'bg-surface-800');
  content = content.replace(/\bborder-white\/5\b/g, 'border-surface-700/50');
  content = content.replace(/\bborder-white\/10\b/g, 'border-surface-700');
  content = content.replace(/\bborder-white\/20\b/g, 'border-surface-600');
  
  // Also fix black
  content = content.replace(/\bbg-black\b/g, 'bg-background');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + filePath);
  }
}

walkDir('app', replaceColors);
walkDir('components', replaceColors);
