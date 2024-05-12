const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const basePath = __dirname;
const profilePicsDir = path.join(basePath, 'profilepic');

async function convertJpgToWebp() {
    // Read all .jpg files in the profilepic directory
    const jpgFiles = (await fs.readdir(profilePicsDir))
        .filter(file => file.endsWith('.jpg'));

    // Iterate through each .jpg file
    for (const jpgFile of jpgFiles) {
        const jpgPath = path.join(profilePicsDir, jpgFile);
        const webpPath = path.join(profilePicsDir, path.basename(jpgFile, '.jpg') + '.webp');

        // Convert JPG to WebP
        await sharp(jpgPath).toFile(webpPath);
        console.log(`Converted ${jpgFile} to WebP.`);

        // Delete the original JPG file
        await fs.unlink(jpgPath);
        console.log(`Deleted ${jpgFile}.`);
    }
}

// Call the function to convert JPG to WebP
convertJpgToWebp().catch(console.error);