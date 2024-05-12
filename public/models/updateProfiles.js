const fs = require('fs-extra');
const path = require('path');

const basePath = __dirname;
const profilePagesDir = path.join(basePath, 'profilepage');
const profilePicsDir = path.join(basePath, 'profilepic');
const dbPath = path.join(basePath, 'db.json');

async function createDatabase() {
    let data = { profiles: [] }; // Initialize an empty database object

    // Read all .jpg files in the profilepage directory
    const jpgFiles = (await fs.readdir(profilePagesDir))
        .filter(file => file.endsWith('.png'));

    let id = 1;
    let matchedCount = 0;

    // Iterate through each .jpg file
    for (const jpgFile of jpgFiles) {
        const baseName = path.basename(jpgFile, '.png');
        const [firstName, lastName] = baseName.split('_');

        // Create a new entry in the database
        const newEntry = {
            id: id++,
            firstName: firstName,
            lastName: lastName,
            profilePage: `/models/profilepage/${baseName}.png`,
            profilePicture: '' // Initially, leave profilePicture empty
        };

        // Check if there's a corresponding profile picture in profilepic directory
        const profilePicPath = path.join(profilePicsDir, `${baseName}.webp`);
        if (await fs.pathExists(profilePicPath)) {
            newEntry.profilePicture = `/models/profilepic/${baseName}.webp`;
            matchedCount++;
        }

        // Add the new entry to the database
        data.profiles.push(newEntry);
    }

    // Write data to the database file
    await fs.writeJson(dbPath, data, { spaces: 4 });

    console.log(`Database created with ${jpgFiles.length} entries.`);
    console.log(`Matched profile pictures: ${matchedCount}`);
    console.log(`Unmatched profile pictures: ${jpgFiles.length - matchedCount}`);
}

// Call the function to create the database
createDatabase().catch(console.error);