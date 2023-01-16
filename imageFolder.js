const assetFolder = __dirname + '/app/assets';
const imageFolder = __dirname + '/app/assets/images';
const audioFolder = __dirname + '/app/assets/audio/yoruba';
const fs = require('fs');
const toCamelcase = require('./app/utilities/toCamelcase');
// import toCamelcase from './app/utilities/toCamelcase';


const assetArray = [];
const imageArray = [];
const audioArray = [];
const unique = new Set();

let display = [];

// function toCamelcase(str) {
//   return str.toLowerCase()
//   .replaceAll('(', '$')
//   .replaceAll(')', '$')
//   .replaceAll(':', '$')
//   .replace(new RegExp(/[-+?,_]+/, 'g'), ' ')
//   .replace(
//     new RegExp(/\s+(.)(\w*)/, 'g'),
//     ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
//   )
//   .replace("'", "")
//   .replace(new RegExp(/\w/), (s, index) => index > 0 ? s.toUpperCase() : s);
// }

const writeList = (file, arr) => {
  const obj = {
    file, 
    includesDot: file.includes('.'), 
    notIncludesDS_Store: !file.includes('.DS_Store'), 
    notIncludesindex: !file.includes('index.js'),
    name: file.split('.')[0],
    print: `export { default as ${toCamelcase(file.split('.')[0])} } from "./${file}"`
  }
  // arr.push(obj);
  if (file.includes('.') && !file.includes('.DS_Store') && !file.includes('index.js') ) {
    const name = file.split('.')[0];
    // if (file === 'ẹ') console.log('this file: ', file);
    if (!unique.has(toCamelcase(name))) {
      display.push(name)
      unique.add(toCamelcase(name));
      arr.unshift(`export { default as ${toCamelcase(name)} } from "./${file}"`);
    }
    else {
      // console.log(file);
    }
  }
}

fs.readdirSync(imageFolder).sort().reverse().forEach(file => writeList(file, imageArray)); unique.clear(); console.log(display.sort()); display = [];
fs.readdirSync(audioFolder).sort().forEach(file => writeList(file, audioArray)); unique.clear(); console.log(display.sort()); display = [];
fs.readdirSync(assetFolder).sort().reverse().forEach(file => writeList(file, assetArray));

fs.writeFileSync(__dirname + '/app/assets/index.js', assetArray.join('\n'));
fs.writeFileSync(__dirname + '/app/assets/images/index.js', imageArray.join('\n'));
fs.writeFileSync(__dirname + '/app/assets/audio/yoruba/index.js', audioArray.join('\n'));
fs.writeFileSync(__dirname + '/audioChecker.js', JSON.stringify(audioArray, null, 2));

console.log('success');
// console.log(audioArray.length + ' audio have been added from ' + fs.readdirSync(audioFolder).length + ' files.');
// console.log(imageArray.length + ' image have been added from ' + fs.readdirSync(imageFolder).length + ' files.');