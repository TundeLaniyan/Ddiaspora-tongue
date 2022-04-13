const assetFolder = __dirname + '/app/assets';
const imageFolder = __dirname + '/app/assets/images';
const audioFolder = __dirname + '/app/assets/audio/yoruba';
const fs = require('fs');

const writeList = (file) => {
  const importArr = [];
  const exportArr = [];
  file.forEach(cur => importArray(cur, importArr));
  importArr.forEach((cur, index) => exportArray(cur, exportArr, index));
  return `${importArr.join('\n')}\n\n\n export default {\n${exportArr.join('\n')}\n}`;
}

const importArray = (file, arr) => {
  if (file.includes('.') && !file.includes('.DS_Store') && !file.includes('index.js') && !file.includes('index copy.js')) {
    arr.push(`import File${arr.length} from "./${file}"`);
  }
}

const exportArray = (file, arr, index) => {
  arr.push(`\t"${file.split('from "./')[1].split('.')[0].replace(/-/g,' ')}": File${index},`);
}

const asset = writeList(fs.readdirSync(assetFolder));
const image = writeList(fs.readdirSync(imageFolder));
const audio = writeList(fs.readdirSync(audioFolder));


fs.writeFileSync(__dirname + '/app/assets/index.js', asset);
fs.writeFileSync(__dirname + '/app/assets/images/index.js', image);
fs.writeFileSync(__dirname + '/app/assets/audio/yoruba/index.js', audio);

console.log('success');