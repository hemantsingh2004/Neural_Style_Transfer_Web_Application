const fs = require('fs');
const path = require('path');

// Function to delete files and folders older than 1 hour
const deleteOldFilesAndFolders = async (folderPath) => {
  const currentTime = Date.now();

  try {
    const items = await fs.promises.readdir(folderPath);
      for (const item of items) {
      const itemPath = path.join(folderPath, item);
      try {
        const stats = await fs.promises.stat(itemPath);

        const itemAge = currentTime - stats.mtimeMs;
        const oneHour = 3600 * 1000;

        if (itemAge > oneHour) {
          if (stats.isDirectory()) {
            await deleteDirectory(itemPath);
          } else {
            await fs.promises.unlink(itemPath);
            console.log(`Deleted old file: ${itemPath}`);
          }
        }
      } catch (err) {
        console.error(`Error getting stats for: ${itemPath},`, err);
      }
    }
  } catch (err) {
    console.error(`Error reading folder: ${folderPath},`, err);
  }
};

const deleteDirectory = async (dirPath) => {
  try {
    const items = await fs.promises.readdir(dirPath);
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      try {
        const stats = await fs.promises.stat(itemPath);

        if (stats.isDirectory()) {
          await deleteDirectory(itemPath);
        } else {
          await fs.promises.unlink(itemPath);
          console.log(`Deleted old file: ${itemPath}`);
        }
      } catch (err) {
        console.error(`Error getting stats for: ${itemPath},`, err);
      }
    }

    await fs.promises.rmdir(dirPath);
    console.log(`Deleted old directory: ${dirPath}`);
  } catch (err) {
    console.error(`Error reading directory: ${dirPath},`, err);
  }
};

export default deleteOldFilesAndFolders;