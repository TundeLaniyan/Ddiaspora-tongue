
import React, { useCallback, useEffect, useState, useContext, memo, ReactElement, useRef } from "react";
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

const HardScreen = memo(function ({ navigation }: Props): ReactElement<Props> {
  const dispatch = useDispatch()
  const Game: GameLogic = useContext(StoreContext);
  const { category, lecture }: { category: number, lecture: number }  = useSelector(({ entities }: any) => entities.exercise);
  
  const [state, setState] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number>();
  const [results, setResults] = useState<{ input: number; answer: "correct" | "incorrect";}[]>([]);
  const [next, setNext] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [cleanUp, setCleanUp] = useState<number[]>([]);
  const unMount = useRef<any[]>();
  unMount.current = cleanUp;
  const gameLimit = 5;
  const cardLimit = next + 5;

  function nextRound() {
    const results: any[] = [];
    setResults(results);
    setCurrentRound(0);
    const totalLength = Game.totalCards();
    const currentLength = lesson[category].subLesson[lecture].text.length;
    const cards = Game.generateCards({ cardLimit, totalLength, currentLength });
    setState(cards);
    Game.delay(2500, () => answerQuestion(cards, results), setCleanUp);
  }

  useEffect(() => () => {
    console.log('unmount', unMount.current);
    unMount.current?.forEach((event) => clearTimeout(event))
  }, []);

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else
      Game.endGame({
        result: (100 * (correct - incorrect)) / correct,
        exercise: "HARD",
        setProgress: (progress: any) => dispatch(setProgress(progress)),
        navigation
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  async function answerQuestion(state: number[], result: any[] = results): Promise<void> {
    const answer = await Game.answerQuestions({ state, results: result, dispatch });
    setAnswer(answer);
    setActive(true);
  }

  const handlePress = useCallback(
    async (input: number): Promise<void> => {
      if (!active) return;
      setActive(false);
      const { lecture, exercise } = Game.getLectureAndExercise(input);
      await Game.playAudio(lecture, exercise, dispatch);
      const CORRECT = input === answer;
      if (CORRECT) correctInput(input);
      else incorrectInput(input);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active]
  );

  async function correctInput(input: number): Promise<void> {
    let result = Game.setResult({ input, state, results, answer: "correct" });
    await Game.correct();
    setCorrect((prev) => prev + 1);
    setCurrentRound(currentRound + 1);
    result = Game.clearIncorrect(result);
    setResults(result);
    if (currentRound === cardLimit - 2) setNext((prev) => prev + 1);
    else answerQuestion(state, result);
  }

  async function incorrectInput(input: number): Promise<void> {
    if (typeof answer === 'number') {
      setResults(Game.setResult({ input, state, results, answer: "incorrect" }));
      await Game.incorrect();
      setIncorrect((prev) => prev + 1);
      const { lecture, exercise } = Game.getLectureAndExercise(answer);
      await Game.playAudio(lecture, exercise, dispatch);
      setActive(true);
    }
  }

  return (
    <View style={styles.hard}>
      <View style={styles.select}>
        {
          state.map((cur, index) => {
            const display = Game.getLectureAndExercise(cur);
            return (
              <Card
                key={cur}
                state={cur}
                lecture={display.lecture}
                exercise={display.exercise}
                onPress={handlePress}
                answer={results[index]?.answer}
                active={active}
              />
            );
          })
        }
      </View>
      <GameFooter
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
  hard: {
    height: '100%',
    // display: 'flex',
    padding: 25,
    paddingBottom: 80,
    flex: 1,
    justifyContent: 'center'
  },
  select: {
    flexDirection: 'row',
    display: 'flex',
    // justifyContent: 'space-around',
    justifyContent: 'center',
    alignContent: 'center',
    // flex: 1,
    flexWrap: 'wrap',
    /* border: 2.5px solid rgba(0, 0, 0, 0.178), */
    borderRadius: 3,
    // height: '80%',
    // paddingVertical: '1%',
    // padding: 1% 0,
    // marginBottom: 90,
  },
});

export default HardScreen;
