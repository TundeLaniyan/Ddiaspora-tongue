import { NATIVELANGUAGE, TARGETLANGUAGE } from "./constant";
import { lesson } from "../../data.json";
import images from './images'
import { View } from "react-native";
import toCamelcase from "./toCamelcase";
// import Sound from "./Sound";

type language = 'English' | 'Yoruba';

class Utilities {
  static generateCards({ cardLimit, totalLength, currentLength = 0 }: 
    { cardLimit: number, totalLength: number, currentLength: number }): number[] {
    const cards = new Set<number>();
    let i = 0;
    while (i < cardLimit) {
      let value;
      if ((!totalLength || currentLength) && Math.ceil(Math.random() * 2) === 2)
        value = Math.ceil(Math.random() * currentLength) + totalLength;
      else value = Math.ceil(Math.random() * (totalLength + currentLength));

      if (!cards.has(value)) {
        i++;
        cards.add(value);
      }
    }
    return [...cards];
  };
  // correct = async () => await Sound.play(`audio/${TARGETLANGUAGE}/yes.m4a`);
  // incorrect = async () => await Sound.play(`audio/${TARGETLANGUAGE}/no.m4a`);
  static delay(timeout: number, cb: () => {}, setCleanUp: any): void {
    const timeOut = setTimeout(() => {
      cb();
      setCleanUp &&
        setCleanUp((prev) => {
          const index = prev.indexOf(timeOut);
          index > -1 && prev.splice(index, 1);
          return prev;
        });
    }, timeout);
    setCleanUp && setCleanUp((prev) => [...prev, timeOut]);
  };
  static setResult({ input, answer, results, state }) {
    const current = [...results];
    const index = state.findIndex((cur) => cur === input);
    current[index] = { input, answer };
    return current;
  };
  static clearIncorrect(results: any[]): any[] {
    const result = results.map((cur) =>
      cur?.answer === "correct" ? cur : { ...cur, answer: "" }
    );
    return result;
  };
  static remainingState({ state, results }: { state: number[], results: any[]}) {
    return state.filter((cur) => {
      const index = results.findIndex((result) => result?.input === cur);
      return index === -1 || results[index].answer !== "correct";
    });
  };
  static translate(translate: string) {
    if (!translate) return "";
    let text: string = "",
      currentLesson;
    loop: for (let i = 0; i < lesson.length; i++) {
      for (let j = 0; j < lesson[i].subLesson.length; j++) {
        for (let k = 0; k < lesson[i].subLesson[j].text.length; k++) {
          if (
            translate.toLowerCase() ===
            lesson[i].subLesson[j].text[k][NATIVELANGUAGE].toLowerCase()
          ) {
            const translate = lesson[i].subLesson[j].text[k][TARGETLANGUAGE];
            text = typeof translate === 'string' ? translate : translate[0];
            currentLesson = i + 1;
            break loop;
          }
        }
      }
    }
    return { text, lesson: currentLesson };
  };
  static toCamelcase(str: string): string { return toCamelcase(str) }
  // static toCamelcase(str: string): string {
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
  static toCamelcase2(str: string): string {
    return str.toLowerCase()
    .replace(new RegExp(/[-+?,_]+/, 'g'), ' ')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s, index) => index > 0 ? s.toUpperCase() : s);
  }
  // static getWordLanguage(category: number, lecture: number, exercise: number, language: language): string {
  //   return this.searchData({ category, lecture, exercise, language })
  // };
  static findImage(category: number, lecture: number, exercise: number): any {
    const text = this.findTextBlock({ category, lecture, exercise })[NATIVELANGUAGE];
    return images(text);
  }
  static findTextBlock({ category, lecture, exercise }
    : { category: number, lecture: number, exercise: number }): { English: string; Yoruba: string } {
    try {
      const block = lesson[category]?.subLesson[lecture]?.text[exercise];
      if(!block) {
        return { English: "", Yoruba: "" };
      }
      block.Yoruba = typeof block.Yoruba === 'string' ? block.Yoruba : block.Yoruba[0];
      return { English: block.English, Yoruba: block.Yoruba };
    } catch(error) {
      console.log(category, lecture, exercise);
      console.log('error findTextBlock', error);
      return { English: "", Yoruba: "" };
    }
  }
  static searchData({ category, lecture, exercise, language }
    : { category: number, lecture: number, exercise: number, language: language }): string {
    return this.findTextBlock({ category, lecture, exercise })[language];
  }
}

export default Utilities;
