const fs = require('fs');
const util = require('util');
const path = require('path');
const readdirPromise = util.promisify(fs.readdir);
const renamePromise = util.promisify(fs.rename);
const statPromise = util.promisify(fs.stat);
const oldDir = path.join(__dirname, "oldDirectory");
const newDir = path.join(__dirname, "newDirectory");

moveFiles(oldDir, newDir);

function moveFiles(oldDirectory, newDirectory){
    readdirPromise(oldDirectory).then(content =>{
        content.forEach(element => {
            let oldPath = path.join(oldDirectory, element);
            statPromise(oldPath).then(stat => {
                if(stat.isFile()){
                    let newPath = path.join(newDirectory, element)
                    renamePromise(oldPath, newPath);
                }else{
                    moveFiles(oldPath, newDirectory);
                }
            });
        });
    });
}