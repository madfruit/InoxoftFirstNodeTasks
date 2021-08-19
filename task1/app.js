const fs = require('fs');
const util = require('util');
const path = require('path');
const boysPath = path.join(__dirname, "boys");
const girlsPath = path.join(__dirname, "girls");
const readdirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);
const renamePromise = util.promisify(fs.rename);

function clearFolder(gender){
    let folderPath;
    let targetFolder;
    if(gender == "male"){
        folderPath = boysPath;
        targetFolder = girlsPath;
    }else{
        folderPath = girlsPath;
        targetFolder = boysPath;
    }
    readdirPromise(folderPath).then(content => {
        content.forEach(element => {
            let filePath = path.join(folderPath, element);
            readFilePromise(filePath).then(value => {
                let person = JSON.parse(value.toString());
                if(person.gender != gender){
                    let newPath = path.join(targetFolder, element);
                    renamePromise(filePath, newPath);
                }
            });
        });
    });
}
clearFolder("male");
clearFolder("female");