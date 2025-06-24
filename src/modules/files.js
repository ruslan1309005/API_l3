const fs = require("fs");
const path = require("path");

function saveToFile(filePath, content) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Создан файл: ${filePath}`);
}

function loadFromFile(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    console.log(`Файл содержит:
${data}`);
    return data;
}

function modifyFile(filePath, newContent) {
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`Обновлен файл: ${filePath}`);
}

function removeFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Удален файл: ${filePath}`);
    } else {
        console.log(`Файл отсутствует: ${filePath}`);
    }
}

function purgeFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`Файл отсутствует: ${filePath}`);
        return;
    }
    let data = fs.readFileSync(filePath, "utf8");
    data = data.replace(/\d+/g, "").toLowerCase();
    fs.writeFileSync(filePath, data, "utf8");
    console.log(`Очищен файл: ${filePath}`);
}

function duplicateFile(source, destination) {
    if (fs.existsSync(source)) {
        fs.copyFileSync(source, destination);
        console.log(`Скопирован ${source} в ${destination}`);
    } else {
        console.log(`Исходный файл отсутствует: ${source}`);
    }
}

function makeFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Создана папка: ${folderPath}`);
    } else {
        console.log(`Папка уже есть: ${folderPath}`);
    }
}

function eraseFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
        console.log(`Удалена папка: ${folderPath}`);
    } else {
        console.log(`Папка отсутствует: ${folderPath}`);
    }
}

function showFiles(dirPath) {
    if (!fs.existsSync(dirPath)) {
        console.log(`Папка отсутствует: ${dirPath}`);
        return;
    }
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    files.forEach(file => {
        if (file.name.startsWith(".") || file.name === "node_modules") return;
        const fullPath = path.join(dirPath, file.name);
        console.log(fullPath);
        if (file.isDirectory()) {
            showFiles(fullPath);
        }
    });
}

function clearDirectory(dirPath) {
    fs.readdirSync(dirPath).forEach(file => {
        let fullPath = path.join(dirPath, file);
        if (!['.git', 'node_modules', 'index.js', 'files.js', '.gitignore', 'modules', 'libs'].includes(file)) {
            if (fs.statSync(fullPath).isDirectory()) {
                removeDirectory(fullPath);
            } else {
                fs.unlinkSync(fullPath);
            }
        }
    });
}
module.exports = {
    saveToFile,
    loadFromFile,
    modifyFile,
    removeFile,
    purgeFile,
    duplicateFile,
    makeFolder,
    eraseFolder,
    showFiles,
    clearDirectory
};