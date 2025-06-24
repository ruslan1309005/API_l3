const path = require("path");
const fsOps = require("./modules/files");

function main() {
    const testFile = path.join(__dirname, "test.txt");
    const copyFilePath = path.join(__dirname, "test_copy.txt");
    const testFolder = path.join(__dirname, "testFolder");

    fsOps.saveToFile(testFile, "Hello WORLD1333!.");
    fsOps.loadFromFile(testFile);
    fsOps.purgeFile(testFile);
    fsOps.loadFromFile(testFile);
    fsOps.duplicateFile(testFile, copyFilePath);
    fsOps.makeFolder(testFolder);
    fsOps.showFiles(__dirname);
    fsOps.removeFile(testFile);
    fsOps.removeFile(copyFilePath);
    fsOps.eraseFolder(testFolder);
    fsOps.clearDirectory(__dirname);
    
}

main();