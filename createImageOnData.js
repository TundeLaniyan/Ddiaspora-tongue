const { lesson } = require('./data.json');
const fs = require("fs");


const imageLesson = lesson.map(lesson => {
    const subLesson = lesson.subLesson.map((subLesson, index) => {
        if (index < 3) return subLesson;
        const text = subLesson.text.map(text => {
            const imageText = text.English
                .replace(/[/()-\s?]+/g, (s) => (s === " " ? "-" : s === "?" ? "" : "+"));
            try { 
                const string = JSON.stringify({ ...text, image: require(`./app/assets/images/${imageText}.jpg`) });
                return JSON.parse(string);
            }
            catch(e) { return text }
        });
        return text
    });
    return {...lesson, subLesson}
});

console.log(imageLesson[1].subLesson[3]);