const fs = require('fs');
const path = require('path')

const dirPath = path.join(__dirname, '/secret-folder/')

fs.readdir(dirPath, (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log("\nCurrent directory filenames:");
    files.forEach(file => {
      fs.stat(dirPath + file, (err, stats) => {
        if (err) throw err;
        const str = path.parse(file).ext;
        const newExt = str.replace(/./, '');

        if (stats.isFile) {
          console.log(`${path.parse(file).name} - ${newExt} - ${stats.size/8}kb`);
        } else {
          console.log("Not a file!");
        }
      });
    })
  }
})