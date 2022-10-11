const fs = require('fs');
const path = require('path');

const pathDist = path.join(__dirname + '/project-dist');
const templatePath = path.join(__dirname + '/template.html');
const styleCssPath = path.join(__dirname + '/project-dist/style.css');
const styleDirPath = path.join(__dirname + '/styles/');
const assetsDir = path.join(__dirname + '/assets/');
const distAssetsDir = path.join(pathDist + '/assets/');
const indexPath = path.join(__dirname, 'project-dist', 'index.html');

let arrHtml = [];
let addDataHtml = [];

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

const createHtml = () => {
    fs.copyFile(templatePath, pathDist + '/index.html', (error) => {
        if (error) throw error;
    })
}

const insertHtmlData = () => {
    fs.copyFile(templatePath, indexPath, (err) => {
        if (err) {
        return console.error(err);
        }
    });
  
    fs.readFile(templatePath, 'utf-8', (err, data) => {
        if (err) console.log(err);
    
        let templateData = data;
        const templateTags = data.match(/{{\w+}}/gm);
    
        for (let tag of templateTags) {
            const tagPath = path.join(
                __dirname,
                '/components',
                `${tag.slice(2, -2)}.html`,
            );
        
            fs.readFile(tagPath, 'utf-8', (err, dataTag) => {
                if (err) console.log(err);
        
                templateData = templateData.replace(tag, dataTag);
        
                fs.rm(indexPath, { recursive: true, force: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                const index = fs.createWriteStream(indexPath);
                index.write(templateData);
                });
            });
        }
    });
}

makeDir();
isExistStyle();
copyDir(assetsDir, distAssetsDir);
createHtml();
insertHtmlData();