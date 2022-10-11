const fs = require('fs');
const path = require('path');

const pathNewDir = path.join(__dirname, 'files-copy/');
const pathDirForCopy = path.join(__dirname, 'files/')

const copyDir = () => {
    fs.mkdir(pathNewDir, { recursive: true }, (err) => {
        if(err) throw err; 
        console.log('Папка успешно создана');
    });

    fs.readdir(pathDirForCopy, (err, files) => {
        if (err) throw err
        else {
            files.forEach(file => {
                fs.copyFile(pathDirForCopy + file, pathNewDir + file, (err) => {
                    if(err) throw err; 
                    console.log('Файл успешно скопирован');
                });
            });
        }
    })
}

copyDir();