import { NATIVELANGUAGE, TARGETLANGUAGE } from "./constant";
import { lesson } from "../../data.json";
import Sound from "./Sound";
import Utilities from "./utilities";
import { setSound } from "../../store/sound";
import React, { Dispatch } from "react";
import routes from "../navigation/routes";


type answerQuestion = { state: number[], cardLimit: number, silent?: boolean, dispatch?: any }; 
type answerQuestionMultLectures = { state: number[], cardLimit: number, dispatch?: any }
type answerQuestions = { state: number[], results: any[], dispatch?: any }
type language = 'English' | 'Yoruba';
type GenerateCards = { cardLimit: number, totalLength: number, currentLength?: number }
type PlayCards = { cardLimit: number, setSoundState: any, gameSpeed: number, cards: number[], autoPlay: boolean, dispatch: any, setCleanUp: any, }
type EndGame = { result: number, exercise: string, navigation: any, setProgress: (arg: any) => { payload: any; type: string; }}
type SetResult = { input: number; answer: ResultAnswer; results: any[]; state: number[]; }
type ResultAnswer = "correct" | "incorrect"

class GameLogic {
  category: number;
  lecture: number;

  constructor(category: number, lecture: number) {
    this.category = category;
    this.lecture = lecture;
  }

  generateCards({ cardLimit, totalLength, currentLength = 0 }: GenerateCards): number[] {
    const cards = new Set<number>();
    let i = 0;
    while (i < cardLimit) {
      let value;
      if ((!totalLength || currentLength) && Math.ceil(Math.random() * 2) === 2)
        value = Math.floor(Math.random() * currentLength) + totalLength;
      else value = Math.floor(Math.random() * (totalLength + currentLength));

      if (!cards.has(value)) {
        i++;
        cards.add(value);
      }
    }
    return [...cards];
  };

  playCards({ cardLimit, setSoundState, gameSpeed, cards, autoPlay, setCleanUp, dispatch }: PlayCards): number {
    for (let i = 0; i <= cardLimit; i++) {
      this.delay(
        gameSpeed * i,
        () => {
          if (autoPlay && i < cardLimit) {
            // const audio = this.getAudio(this.lecture, cards[i])
            // Sound.start(audio);
            this.playAudio(this.lecture, cards[i], dispatch)
          }
            // Sound.start(`audio/${TARGETLANGUAGE}/${this.getWord(this.lecture, cards[i])}.m4a`);
          setSoundState(i);
        },
        setCleanUp
      );
    }
    return gameSpeed * cardLimit;
    // this.delay(gameSpeed * cardLimit, () => setSoundState(cardLimit));
  };
  endGame({ result, exercise, navigation, setProgress }: EndGame): void {
    console.log("endGame called");
    
    setProgress({ 
      result,
      exercise,
      category: lesson[this.category].title,
      lecture: lesson[this.category].subLesson[this.lecture].title,
      timestamp: Date.now() 
    });
    navigation.push(routes.ENDGAME, { percentage: result });
  };
  async answerQuestion({ state, cardLimit, silent, dispatch }: answerQuestion): Promise<number> {
    const value = Math.floor(Math.random() * cardLimit);
    // !silent &&
      // (await Sound.play(
      //   `audio/${TARGETLANGUAGE}/${this.getWord(this.lecture, state[value])}.m4a`
      // ));
    // !silent && (await Sound.play(this.getAudio(this.lecture, state[value])));
    !silent && (await this.playAudio(this.lecture, state[value], dispatch));
    return state[value];
  };
  async answerQuestionMultLectures({ state, cardLimit, dispatch }: answerQuestionMultLectures): Promise<number> {
    const value = Math.floor(Math.random() * cardLimit);
    const { lecture, exercise } = this.getLectureAndExercise(state[value]);
    // await Sound.play(this.getAudio(lecture, exercise));
    await this.playAudio(lecture, exercise, dispatch);
    return state[value];
  };
  async answerQuestions({ state, results, dispatch }: answerQuestions): Promise<number> {
    const remainingState = this.remainingState({ state, results });
    const answerPositon = await this.answerQuestionMultLectures({
      state: remainingState,
      cardLimit: remainingState.length,
      dispatch
    });
    return answerPositon;
    // return this.displayCard(answerPositon, this.lecture).exercise;
  };
  async correct(): Promise<void> { await Sound.play('yes'); }
  async incorrect(): Promise<void> { await Sound.play('no'); }
  delay(timeout: number, cb: (arg: number[]) => any, setCleanUp?: React.Dispatch<React.SetStateAction<number[]>>): void {
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
  totalCards(): number {
    console.log("this.category", this.category);
    return lesson[this.category].subLesson
      .slice(0, this.lecture)
      .reduce((total, cur) => total + cur.text.length, 0);
  }
  // displayCard(state: number, lecture: number): { exercise: number, lecture: number, state: number } {
  //   let runningTotal = state,
  //     currentLecture = 0,
  //     exercise = state,
  //     accumulation = 0;
  //   for (let i = 0; i < lecture + 1; i++) {
  //     const currentLength = lesson[this.category].subLesson[i].text.length;
  //     if (runningTotal < currentLength) {
  //       exercise = state - accumulation;
  //       currentLecture = i;
  //       break;
  //     }
  //     runningTotal -= currentLength;
  //     accumulation += currentLength;
  //   }
  //   return { exercise, lecture: currentLecture, state };
  // };
  getLectureAndExercise(state: number): { exercise: number, lecture: number, state: number } {
    let runningTotal = state,
      lecture = 0,
      exercise = state,
      accumulation = 0;
      const limit = lesson[this.category].subLesson.length;
    for (let i = 0; i < limit; i++) {
      const currentLength = lesson[this.category].subLesson[i].text.length;
      if (runningTotal < currentLength) {
        exercise = state - accumulation;
        lecture = i;
        break;
      }
      runningTotal -= currentLength;
      accumulation += currentLength;
    }
    return { exercise, lecture, state };
  };
  setResult({ input, answer, results, state }: SetResult): { input: number; answer: ResultAnswer; }[] {
    const current = [...results];
    const index = state.findIndex((cur) => cur === input);
    current[index] = { input, answer };
    return current;
  };
  clearIncorrect(results: any[]): any[] {
    const result = results.map((cur) =>
      cur?.answer === "correct" ? cur : { ...cur, answer: "" }
    );
    return result;
  };
  remainingState({ state, results }: { state: number[], results: any[] }): number[] {
    return state.filter((cur) => {
      const index = results.findIndex((el) => el?.input === cur);
      return index === -1 || results[index].answer !== "correct";
    });
  };
  // getWord(lecture: number, exercise: number): string { 
  //   return Utilities.searchData({ category: this.category, lecture, exercise, language: TARGETLANGUAGE})
  // }
  // getWordMult(state: number, currentLecture: number): string {
  //   if (!state || !currentLecture) return "";
  //   const { lecture, exercise } = this.displayCard(state, currentLecture);
  //   return Utilities.searchData({ category: this.category, lecture, exercise, language: TARGETLANGUAGE})
  // };
  getAudio(lecture: number, exercise: number): string {
    return Utilities.searchData({ category: this.category, lecture, exercise, language: TARGETLANGUAGE})
  }
  getAudioByCollectiveState(state: number): string {
    const { lecture, exercise } = this.getLectureAndExercise(state);
    return Utilities.searchData({ category: this.category, lecture, exercise, language: TARGETLANGUAGE});
  }
  async playAudio(lecture: number, exercise: number, dispatch?: any): Promise<void> {
    const { type } = lesson[this.category].subLesson[lecture];
    if (dispatch && type !== "TARGETLANGUAGE") {
      const audioText = Utilities.searchData({ 
        category: this.category,
        language: TARGETLANGUAGE,
        lecture,
        exercise 
      });
      dispatch(setSound(audioText));
    }
    const audio = this.getAudio(lecture, exercise);
    await Sound.play(audio);
  }
}

export default GameLogic;
