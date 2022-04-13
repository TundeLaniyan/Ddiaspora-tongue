const { lesson } = require("./data.json");
const fs = require('fs');

const audio = fs.readFileSync(__dirname + '/app/assets/audio/yoruba/index.js', "utf8");
const audioFix = []

lesson.forEach(lesson => {
  lesson.subLesson.forEach(subLesson => {
    subLesson.text.forEach(text => {
      if (typeof text.Yoruba !== "string") {
        text.Yoruba.forEach(yoruba => {
          if (!audio.includes(yoruba.toLowerCase().replaceAll('?', ''))) audioFix.push(yoruba);
        })
      } else {
        if (!audio.includes(text.Yoruba.toLowerCase().replaceAll('?', ''))) audioFix.push(text.Yoruba);
      }
    })
  })
})

audioFix.sort();
console.log(audioFix);
console.log(audioFix.length);
// console.log(audio.includes("Ma fọṣọ tó rírí a".toLowerCase()))
