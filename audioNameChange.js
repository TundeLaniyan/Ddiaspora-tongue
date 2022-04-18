const { join, extname, basename } = require('path');
const { readdirSync, renameSync } = require('fs');
// const assetFolder = __dirname + '/app/assets';
// const imageFolder = __dirname + '/app/assets/images';
const audioFolder = __dirname + '/app/assets/audio/yoruba';

const pathToOldFolders = [audioFolder];

for(const pathToOldFolder of pathToOldFolders) {
  for (const oldFile of readdirSync(pathToOldFolder)) {
      const extension = extname(oldFile);
      const name = basename(oldFile, extension);
      if (['.svg', '.jpg', '.png', '.m4a'].includes(extension)) {
          renameSync(join(pathToOldFolder, oldFile), join(pathToOldFolder, name.replace(/\s/g,'-').replace('?','').toLowerCase() + extension));
      }
  }
}

// console.log(readdirSync(pathToOldFolder)[1]);


// for (const oldFile of readdirSync(pathToOldFolder).reverse()) {
//   const extension = extname(oldFile);
//   const name = basename(oldFile, extension);
//   // if (extension === '.svg') svgImages.push(name);
//   if (extension === '.jpg') {
//     renameSync(join(pathToOldFolder, oldFile), join(pathToOldFolder, name.replace('000   ', '') + extension));
//   }
// }