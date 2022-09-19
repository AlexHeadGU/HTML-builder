const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dirPath = path.join(__dirname, 'text.txt')

const writeStream = fs.createWriteStream(dirPath, 'utf8')

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

console.log("Введите данные, которые требуется записать в файл...")
rl.on('line', (line) => {
    if (line === 'exit'){
        console.log("Пока!");
        process.exit(0)
    }
    writeStream.write(line);    
}).on('close', () => {
    console.log("Пока!");
    process.exit(0)
});

rl.on('error', (err) => {
    if(err) {
        console.log(err);
    }
})