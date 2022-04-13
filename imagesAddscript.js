const { lesson } = require('./data.json');
const fs = require('fs');

const lessons = lesson.map(lesson => {
  const subLesson = lesson.subLesson.map(subLesson => {
    const text = subLesson.text.map(text => {
      const image = text.English.replace(/[/()-\s?]+/g, (s) => (s === " " ? "-" : s === "?" ? "" : "+"))
      return { ...text, image }
    });
    return { ...subLesson, text }
  });
  return { ...lesson, subLesson }
});

const stringLessons = JSON.stringify({lessons}, null, 2);

try {
  fs.writeFileSync('./data2.json', stringLessons, 'utf-8');
  console.log('success');
} catch (error) {
  console.log(error);
}