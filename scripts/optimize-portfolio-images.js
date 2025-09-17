/**
 * Image Optimization Script for Portfolio
 * 
 * This script generates optimized versions of portfolio images:
 * 1. Thumbnails (smaller, compressed versions for faster loading)
 * 2. Placeholders (tiny, blurred versions for immediate display while loading)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // You may need to install: npm install sharp

// Paths
const SOURCE_DIR = path.join(__dirname, '../src/assets/images/portfolio');
const OUTPUT_DIR = path.join(__dirname, '../public/assets/optimized');

// Configuration
const THUMBNAIL_WIDTH = 400; // Width for thumbnails
const PLACEHOLDER_WIDTH = 20; // Width for placeholders

// Ensure output directories exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Process a single image
async function processImage(sourcePath, folderName, fileName) {
  try {
    const projectId = folderName.toLowerCase().replace(/\s+/g, '-');
    
    // Create output directories
    const thumbnailDir = path.join(OUTPUT_DIR, projectId, 'thumbnails');
    const placeholderDir = path.join(OUTPUT_DIR, projectId, 'placeholders');
    
    ensureDirectoryExists(thumbnailDir);
    ensureDirectoryExists(placeholderDir);
    
    // Generate thumbnail
    await sharp(sourcePath)
      .resize(THUMBNAIL_WIDTH)
      .jpeg({ quality: 70 })
      .toFile(path.join(thumbnailDir, fileName));
    
    // Generate placeholder (tiny blurred image)
    await sharp(sourcePath)
      .resize(PLACEHOLDER_WIDTH)
      .blur(5)
      .jpeg({ quality: 30 })
      .toFile(path.join(placeholderDir, fileName));
    
    console.log(`Processed: ${folderName}/${fileName}`);
  } catch (error) {
    console.error(`Error processing ${folderName}/${fileName}:`, error);
  }
}

// Process all images in the portfolio
async function processAllImages() {
  try {
    // Read manifest file to get folder structure
    const manifestPath = path.join(SOURCE_DIR, 'portfolio-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Process each folder
    for (const folder of manifest.folders) {
      const folderName = folder.name;
      const folderPath = path.join(SOURCE_DIR, folderName);
      
      // Skip if folder doesn't exist
      if (!fs.existsSync(folderPath)) {
        console.warn(`Folder not found: ${folderName}`);
        continue;
      }
      
      // Process each image in the folder
      for (const imageName of folder.images) {
        const imagePath = path.join(folderPath, imageName);
        
        // Skip if image doesn't exist
        if (!fs.existsSync(imagePath)) {
          console.warn(`Image not found: ${folderName}/${imageName}`);
          continue;
        }
        
        await processImage(imagePath, folderName, imageName);
      }
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Run the script
processAllImages();