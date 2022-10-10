const { dir } = require('console');
const fs = require('fs');
const path = require('path');

const pathDist = path.join(__dirname + '/project-dist');
const styleCssPath = path.join(__dirname + '/project-dist/style.css');
const styleDirPath = path.join(__dirname + '/styles/');
const assetsDir = path.join(__dirname + '/assets/');
const distAssetsDir = path.join(pathDist + '/assets/');

const makeDir = () => {
    fs.mkdir(pathDist, { recursive: true }, (err) => {
        if(err) throw err; 
        console.log('Папка /project-dist успешно создана');
    });
}

const isExistStyle = () => {
    fs.stat(styleCssPath, (error, stats) => {
        if (error) {
        if (error.code === 'ENOENT') {
            console.log('------------------\nФайл style.css создан...\n------------------')
        }else throw error; 
        }else {
        fs.rm(styleCssPath, {recursive: true}, (err) => {
            if(err) throw err; 
            console.log('------------------\nФайл style.css уже существует, удаляем... \nИ создаем заново :)\n------------------')
        })
        }
        readSccFiles();
    });
}

const readSccFiles = () => {
    fs.readdir(styleDirPath, (err, files) => {
      if (err) throw err
      else {
        files.forEach(file => {
        
          fs.stat(styleDirPath + file, (err, stats) => {
            if (err) throw err;
            const str = path.parse(file).ext;
            
            if (str=== '.css') {
              let readableStream = fs.createReadStream(
                styleDirPath + file,
                'utf8'
              )
  
              readableStream.on('data', function(data) {
                  fs.appendFile(styleCssPath, data, (error) => {
                    if(error) throw error
                    console.log('Файл style.css обновлен')
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

const copyDir = (src, dist) => {
    fs.mkdir(dist, { recursive: true }, (err) => {
                if(err) throw err; 
                console.log('Папка успешно создана');
            });

    fs.readdir(src, function(err, items){
        if (err) throw err;
        items.forEach(item => {
            fs.stat(src + '/' + item, (error, stats) => {
                if (error) throw error
                if (stats.isDirectory()){
                    copyDir(src + '/' + item, dist + item)
                } else {
                    fs.copyFile(src + '/' + item, dist + '/' + item, (error) => {
                        if (error) throw error;
                    })
                }
            })
        })
    })
}

makeDir();
isExistStyle();
copyDir(assetsDir, distAssetsDir);