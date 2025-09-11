const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '../src/assets/images/portfolio');
const manifestPath = path.join(portfolioDir, 'portfolio-manifest.json');

function getFolders(dir) {
  return fs.readdirSync(dir).filter(f => 
    fs.statSync(path.join(dir, f)).isDirectory()
  );
}

function getImages(folderPath) {
  return fs.readdirSync(folderPath).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
  });
}

const folders = getFolders(portfolioDir);
const manifest = { folders: [] };

folders.forEach(folder => {
  const folderPath = path.join(portfolioDir, folder);
  let images = [];
  try {
    images = getImages(folderPath);
  } catch (e) {
    images = [];
  }
  manifest.folders.push({
    name: folder,
    images
  });
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
