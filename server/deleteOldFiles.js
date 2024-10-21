// Function to delete files older than 1 hour
const deleteOldFiles = (folderPath) => {
  const currentTime = Date.now();

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading folder: ${folderPath}`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting file stats: ${filePath}`, err);
          return;
        }

        const fileAge = currentTime - stats.mtimeMs;  // Calculate file age (in ms)
        const oneHour = 3600 * 1000;  // 1 hour in milliseconds

        if (fileAge > oneHour) {
          // If file is older than 1 hour, delete it
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${filePath}`, err);
            } else {
              console.log(`Deleted old file: ${filePath}`);
            }
          });
        }
      });
    });
  });
};

export default deleteOldFiles;