const fs = require('fs');
const path = require('path');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy dist folder to functions directory
const distSrc = path.join(__dirname, 'dist', 'cuac-design');
const distDest = path.join(__dirname, 'functions', 'dist', 'cuac-design');

console.log('Copying from:', distSrc);
console.log('Copying to:', distDest);

if (fs.existsSync(distSrc)) {
  copyDirectory(distSrc, distDest);
  console.log('✅ Dist files copied successfully!');
} else {
  console.log('❌ Source dist folder not found!');
  process.exit(1);
}
