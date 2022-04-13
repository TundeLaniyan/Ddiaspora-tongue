const assetFolder = __dirname + '/app/assets';
const imageFolder = __dirname + '/app/assets/images';
const audioFolder = __dirname + '/app/assets/audio/yoruba';
const fs = require('fs');

const assetArray = [];
const imageArray = [];
const audioArray = [];

const rename = (file, path) => {
  const lowerLetter = file[0].toLowerCase() + file.slice(1)
  fs.renameSync(path + file, path + lowerLetter);
}

fs.readdirSync(assetFolder).sort().forEach(file => rename(file, __dirname + '/app/assets/'));
fs.readdirSync(imageFolder).sort().forEach(file => rename(file, __dirname + '/app/assets/images/'));
fs.readdirSync(audioFolder).sort().forEach(file => rename(file, __dirname + '/app/assets/audio/yoruba/'));


console.log('success');