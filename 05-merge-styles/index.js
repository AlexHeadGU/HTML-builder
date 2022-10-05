const fs = require('fs');
const path = require('path');


const dirPath = path.join(__dirname, '/styles/')
const bundleDirPath = path.join(__dirname + '/project-dist/bundle.css');

let dataArr = [];

const reader = () => {
  fs.readdir(dirPath, (err, files) => {
    if (err) throw err
    else {
      files.forEach(file => {
      
        fs.stat(dirPath + file, (err, stats) => {
          if (err) throw err;
          const str = path.parse(file).ext;
          
          if (str=== '.css') {
            console.log(file);
            let readableStream = fs.createReadStream(
              dirPath + file,
              'utf8'
            )

            readableStream.on('data', function(data) {
                dataArr.push(data)
                fs.appendFile(bundleDirPath, data, (error) => {
                  if(error) throw error
                  console.log('Файл bundle.css обновлен')
                });
            });
            
            readableStream.on('error', function(err) {
                if(err) throw err
            })
          }
        });
      })
    }  
  })
}

fs.stat(bundleDirPath, (error, stats) => {
  if (error) {
    if (error.code === 'ENOENT') {
      console.log('------------------\nФайл создан...\n------------------')
    }else throw error; 
  }else {
    fs.rm(bundleDirPath, {recursive: true}, (err) => {
      if(err) throw err; 
      console.log('------------------\nФайл bundle.scss уже существует, удаляем... \nИ создаем заново :)\n------------------')
    })
  }

  reader();
  
});

