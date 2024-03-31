const fs = require("fs");
const path = require("path");

const layersFolderPath = path.join(__dirname, "layers");

fs.readdir(layersFolderPath, (err, files) => {
  if (err) {
    console.error("Error reading files:", err);
    return;
  }

  for (const file1 of files) {
    fs.readdir(path.join(layersFolderPath, file1), (err, files) => {
      if (err) {
        console.error("Error reading files:", err);
        return;
      }

      for (const file2 of files) {
        // Capitalize the first letter of each word
        const newFileName = file2
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        fs.rename(
          path.join(layersFolderPath, file1, file2),
          path.join(layersFolderPath, file1, newFileName),
          (err) => {
            if (err) {
              console.error("Error renaming file:", err);
              return;
            }
            console.log(`Renamed file: ${file1} to ${newFileName}`);
          }
        );
      }
    });
  }

  console.log("Renaming complete!");
});
