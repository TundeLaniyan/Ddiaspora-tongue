const { lesson } = require("./data.json");
const fs = require('fs');

const image = fs.readFileSync(__dirname + '/app/assets/images/index.js', "utf8");
const imageFix = []

lesson.forEach(lesson => {
  lesson.subLesson.forEach(subLesson => {
    subLesson.text.forEach(text => {
      if (
        !image.includes(text.English.toLowerCase().replaceAll('?', '')) && 
        !text.English.includes("Accent") &&
        !text.English.includes("Alphabet")
      ) imageFix.push(text.English);
    })
  })
})

imageFix.sort();
// console.log(JSON.stringify(imageFix.join('\n')));
fs.writeFileSync('./missingImages.txt', imageFix.join('\n'))
console.log(imageFix);
console.log(imageFix.length);
// console.log(image.includes("Ma fọṣọ tó rírí a".toLowerCase()))
