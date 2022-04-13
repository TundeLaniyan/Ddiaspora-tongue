import React, { ReactElement, useEffect, useState, useRef, useCallback, memo, useContext } from "react";
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import { setProgress } from "../../store/progress";
import { lesson } from "../../data.json";
import Sound from "../utilities/Sound";
import Card from "../component/Card";
import GameFooter from "../component/Footer";
import StoreContext from "../../context/gameLogicContext";
import GameLogic from "../utilities/gameLogic";

type Props = {
  navigation: any
};

const RapidScreen = memo(function ({ navigation }: Props): ReactElement<Props> {
  const Game: GameLogic = useContext(StoreContext)
  const dispatch = useDispatch()
  const { category, lecture }: { category: number, lecture: number } = useSelector(({ entities }: any) => entities.exercise);
  
  const [state, setState] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number>();
  const [results, setResults] = useState<any[]>([]);
  const [next, setNext] = useState(0);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [percent, setPercent] = useState(100);
  const [intervalID, setIntervalID] = useState(0);
  const [pauseInterval, setPauseInterval] = useState(false);
  const selectRef = useRef<any>();
  const ref = useRef<any>();
  ref.current = { next, state, percent, pauseInterval, cleanUp: intervalID };
  const gameLimit = 5;
  const cardLimit = next + 7;

  async function nextRound() {
    setState([]);
    const results: any[] = [];
    setResults(results);
    setPercent(100);
    setCurrentRound(0);
    const totalLength = Game.totalCards();
    const currentLength = lesson[category].subLesson[lecture].text.length;
    const cards = Game.generateCards({ cardLimit, totalLength, currentLength });
    setState(cards);
    setPauseInterval(true)
    await answerQuestion(cards, results);
    // setPauseInterval(false)
  }

  useEffect(() => () => clearInterval(ref.current.cleanUp), []);

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else {
      const result =
        (100 * correct) / ((2 * cardLimit - gameLimit + 1) * (gameLimit / 2)) +
        incorrect;
      Game.endGame({
        result,
        exercise: "RAPID", 
        setProgress: (progress: any) => dispatch(setProgress(progress)),
        navigation
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  useEffect(() => {
    clearInterval(intervalID);
    const intervalId: any = setInterval(() => {
      if (ref.current.pauseInterval) return;
      if (ref.current.percent <= 0) {
        clearInterval(intervalId);
        setNext((prev) => prev + 1);
      } else {
        ref.current.percent -= 5;
        setPercent((prev) => prev - 5);
      }
    }, ((7 + next) * 1000) / 20);
    setIntervalID(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseInterval, next]);

  const handlePress = useCallback(
    async (input: number): Promise<void> => {
      if (!active) return;
      setActive(false);
      setPauseInterval(true);
      // await Sound.play(Game.getAudioByCollectiveState(input));
      const { lecture, exercise } = Game.getLectureAndExercise(input);
      await Game.playAudio(lecture, exercise, dispatch);
      const CORRECT = input === answer;
      if (CORRECT) await correctInput(input);
      else await incorrectInput(input);
      // setPauseInterval(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, state, answer, pauseInterval]
  );

  async function correctInput(input: number): Promise<void> {
    let result = Game.setResult({ input, state, results, answer: "correct" });
    await Game.correct();
    setCorrect((prev) => prev + 1);
    setCurrentRound(currentRound + 1);
    result = Game.clearIncorrect(result);
    setResults(result);
    const ENDOFROUND = currentRound === cardLimit - 2;
    if (ENDOFROUND) setNext((prev) => prev + 1);
    else await answerQuestion(state, result);
  }

  async function incorrectInput(input: number): Promise<void> {
    if (answer) {
      setResults(Game.setResult({ input, state, results, answer: "incorrect" }));
      await Game.incorrect();
      setIncorrect((prev) => prev + 1);
      // await Sound.play(Game.getAudioByCollectiveState(answer));
      const { lecture, exercise } = Game.getLectureAndExercise(answer);
      await Game.playAudio(lecture, exercise, dispatch);
      setActive(true);
    }
  }

  async function answerQuestion(state: number[], result: any[] = results) {
    const answer = await Game.answerQuestions({ state, results: result, dispatch });
    setAnswer(answer);
    setActive(true);
  }

  return (
    <View style={styles.rapidGame}>
      <View style={styles.select} ref={selectRef}>
        {state.map((cur, index) => {
          const display = Game.getLectureAndExercise(cur);
          return (
            <Card
              key={cur}
              state={cur}
              lecture={display.lecture}
              exercise={display.exercise}
              onPress={handlePress}
              active={active}
              answer={results[index]?.answer}
            />
          );
        })}
      </View>
      <GameFooter
        percent={percent}
        audio={typeof answer === 'number' ? Game.getAudioByCollectiveState(answer): "undefined"}
        correct={correct}
        incorrect={incorrect}
        active={active}
        Sound={Sound}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  rapidGame: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 15,
    flex: 1,
    paddingBottom: 90,
  },
  select: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center',
    flexWrap: 'wrap',
    // height: '80%',
    paddingVertical: 10,
    flexDirection: 'row',
  }
});

export default RapidScreen;