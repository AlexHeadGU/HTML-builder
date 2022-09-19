const fs = require('fs');
const path = require('path')


const dirPath = path.join(__dirname, '/secret-folder/')

fs.readdir(dirPath, (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach(file => {

        console.log( typeof file);

        fs.stat(dirPath + file, (err, stats) => {
            if (err) throw err;
          
            // console.log(`stats: ${JSON.stringify(stats)}`);
            if (stats.isFile) {
                console.log(`${path.parse(file).name} - ${path.parse(file).ext} - ${stats.size}`);
            } else {
                console.log("Not a file!");
            }
        });


        // console.log(fs.stat())
        // console.log(file.isFile)
        // if (file.isFile) {
        //     console.log(file);
        // }
      })
    }
  })