const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '../src/assets/images/portfolio');
const manifestPath = path.join(portfolioDir, 'portfolio-manifest.json');

function scanPortfolioFolders() {
    const folders = fs.readdirSync(portfolioDir)
        .filter(file => fs.statSync(path.join(portfolioDir, file)).isDirectory());

    const manifest = {
        folders: folders
    };

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

module.exports = scanPortfolioFolders;