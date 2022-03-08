const fs = require('fs');
const path = require('path');
const translate = require('../22-03-08-translate/translate');

const chineseReg = /([\u4e00-\u9fa5])+/g;

const chinessList = [];

function getFileChineseList(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const chineseList = fileContent.match(chineseReg);
  if (chineseList) return chineseList;
  return [];
}

function readDirFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  const allowFiles = ['js', 'ts', 'vue'];
  files.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readDirFiles(path.join(dir, item), filesList); // 递归读取文件
    } else {
      // 只允许配置文件
      if (allowFiles.includes(fullPath.split('.')[1])) {
        filesList.push(fullPath);
      }
    }
  });
  return filesList;
}

const dirPath = 'path_to_dir';
const files = readDirFiles(dirPath);
console.log(files);
files.forEach((file) => {
  const fileChineseList = getFileChineseList(file);
  chinessList.push(...fileChineseList);
});
const uniqueChineseList = [...new Set(chinessList)];
console.log(uniqueChineseList);

(async () => {
  const testList = uniqueChineseList.slice(100, 110);
  const testMap = {};
  for (const text of testList) {
    const textRes = await translate(text);
    testMap[text] = textRes;
  }
  console.log(testMap);
})();
