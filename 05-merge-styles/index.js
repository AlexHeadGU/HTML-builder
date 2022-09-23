const fs = require('fs');
const path = require('path');


const dirPath = path.join(__dirname, '/styles/')

fs.readdir(dirPath, (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach(file => {
        fs.stat(dirPath + file, (err, stats) => {
          if (err) throw err;
          const str = path.parse(file).ext;
          
          if (str=== '.css') {
            console.log(file);
          } else {
            console.log("Not a file!");
          }
        });
      })
    }
  })