const { lesson } = require('./data.json');
const fs = require('fs');

const images = fs.readFileSync(__dirname + '/app/assets/images/index.js', "utf8");
const audios = fs.readFileSync(__dirname + '/app/assets/audio/yoruba/index.js', "utf8");
// console.log(images);

const missingImages = [];
const missingAudios = [];

function transformWord(str) {
  // console.log(str);
  return str.replace(/[/()-\s?]+/g, (s) => (s === " " ? "-" : s === "?" ? "" : "+"));
}

function toCamelcase(str) {
  return str
    .toLowerCase()
    .replace(new RegExp(/[-+?,_]+/, 'g'), ' ')
    .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
    .replace(new RegExp(/\w/), (s, index) => index > 0 ? s.toUpperCase() : s);
};

const checkImage = image => {
  const imageText = transformWord(image);
  const imageFile = toCamelcase(imageText);
  if (images.includes(imageFile)) missingImages.push(image);
}
const checkSound = audio => {
  const audioText = transformWord(audio);
  const audioFile = toCamelcase(audioText);
  if (audios.includes(audioFile)) missingAudios.push(audioFile);
}

lesson.forEach(lesson => {
  lesson.subLesson.forEach(subLesson => {
    subLesson.text.forEach(text => {
      if (typeof text.Yoruba === 'string') {
        checkSound(text.Yoruba);
      } else {
        text.Yoruba.forEach(yoruba => {
          checkSound(yoruba);
        });
      }
      checkImage(text.English);
    })
  })
})
// console.log("audios".includes('a'));
console.log("Missing Images: ", missingImages);
console.log("Missing Audios: ", missingAudios);