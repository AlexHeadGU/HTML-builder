const fs = require('fs');
const path = require('path');

const dirPath  = path.join(__dirname, 'text.txt')

let readableStream = fs.createReadStream(
    dirPath,
    'utf8'
  )

  readableStream.on('data', function(data) {
    console.log(data);
});

readableStream.on('error', function(err) {
    if(err) {
        console.log(err);
    }
})
