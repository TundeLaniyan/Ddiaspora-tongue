import React, { useEffect, useState, useRef, useCallback, ReactElement, useContext } from "react";
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

function MemoryScreen({ navigation }: Props): ReactElement<Props> {
  const Game: GameLogic = useContext(StoreContext)
  const dispatch = useDispatch()
  const { category, lecture }: { category: number, lecture: number } = useSelector(({ entities }: any) => entities.exercise);

  const [state, setState] = useState<number[]>([]);
  const [hidden, setHidden] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number>();
  const [results, setResults] = useState<any[]>([]);
  const [next, setNext] = useState(0);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [percent, setPercent] = useState(100);
  const [intervalID, setIntervalID] = useState<NodeJS.Timer | number>(0);
  const [pauseInterval, setPauseInterval] = useState(false);
  const ref = useRef<any>();
  ref.current = { next, state, percent, pauseInterval, cleanUp: intervalID };
  const gameLimit = 6;
  const cardLimit = next + 2;

  function nextRound() {
    setResults([]);
    setPercent(100);
    setCurrentRound(0);
    const totalLength = Game.totalCards();
    const currentLength = lesson[category].subLesson[lecture].text.length;
    const cards = Game.generateCards({ cardLimit, totalLength, currentLength });
    setState(cards);
  }

  useEffect(() => () => {
    Sound.stop();
    clearInterval(ref.current.cleanUp)}
    , []);

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else
      Game.endGame({
        result: (200 * correct) / ((1 + gameLimit) * gameLimit + incorrect * 2),
        exercise: "MEMORY",
        setProgress: (progress: any) => dispatch(setProgress(progress)),
        navigation
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  useEffect(() => {
    clearInterval(intervalID);
    const increment = 1000;
    const intervalId: NodeJS.Timer = setInterval(() => {
      if (ref.current.pauseInterval) return;
      if (ref.current.percent <= 0) {
        clearInterval(intervalId);
        setHidden(ref.current.state);
        answerQuestion(ref.current.state);
      } else {
        ref.current.percent -= 5;
        setPercent((prev) => prev - 5);
      }
    }, (5000 + next * increment) / 20);
    setIntervalID(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseInterval, next]);

  const handlePress   = useCallback(
    async (input: number): Promise<void> => {
      if (!active) return;
      setActive(false);
      revealCard(input);
      // await Sound.play(Game.getAudioByCollectiveState(input));
      const { lecture, exercise } = Game.getLectureAndExercise(input);
      await Game.playAudio(lecture, exercise, dispatch);
      const CORRECT = input === answer;
      if (CORRECT) correctInput(input);
      else incorrectInput(input);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active]
  );

  function revealCard(input: number): void {
    const current = [...hidden];
    const hiddenIndex = current.indexOf(input);
    current[hiddenIndex] = -current[hiddenIndex];
    setHidden(current);
  }

  async function correctInput(input: number): Promise<void> {
    let result = Game.setResult({ input, state, results, answer: "correct" });
    await Game.correct();
    setCorrect((prev) => prev + 1);
    setCurrentRound(currentRound + 1);
    result = Game.clearIncorrect(result);
    setResults(result);
    const ENDOFROUND = currentRound === cardLimit - 2;
    if (ENDOFROUND) {
      setHidden([]);
      setNext((prev) => prev + 1);
    } else {
      setHidden(state);
      answerQuestion(state, result);
    }
  }

  async function incorrectInput(input: number): Promise<void> {
    setResults(Game.setResult({ input, state, results, answer: "incorrect" }));
    await Game.incorrect();
    setIncorrect((prev) => prev + 1);
    setHidden(state);
    // await Sound.play(Game.getAudioByCollectiveState(answer));
    const { lecture, exercise } = Game.getLectureAndExercise(answer);
    await Game.playAudio(lecture, exercise, dispatch)
    setActive(true);
  }

  async function answerQuestion(state: number[], result: any[] = results): Promise<void> {
    const answer = await Game.answerQuestions({ state, results: result, dispatch });
    setAnswer(answer);
    setActive(true);
  }
  
  return (
    <View style={styles.memoryGame}>
      <View style={styles.select}>
        {state.map((cur, index) => {
          const { lecture, exercise } = Game.getLectureAndExercise(cur);
          return (
            <Card
              key={cur}
              state={cur}
              lecture={lecture}
              exercise={exercise}
              onPress={handlePress  }
              hide={hidden[index] === cur}
              answer={results[index]?.answer}
              active={active}
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
}

const styles = StyleSheet.create({
  memoryGame: {
    height: '100%',
    paddingVertical: 25,
    justifyContent: 'center',
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export default MemoryScreen;