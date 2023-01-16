import React, { ReactElement, useCallback, useEffect, useState, memo, useContext, useRef } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import { setProgress } from "../../store/progress";
import { TARGETLANGUAGE } from "../utilities/constant";
import { lesson } from "../../data.json";
import Sound from "../utilities/Sound";
import Card from "../component/Card";
import GameFooter from "../component/Footer";
import StoreContext from "../../context/gameLogicContext";
import Utilities from "../utilities/utilities";
import GameLogic from "../utilities/gameLogic";

type Props = {
  navigation: any
};

const ReadingScreen = memo(function ({ navigation }: Props): ReactElement<Props> {
  const Game: GameLogic = useContext(StoreContext)
  const dispatch = useDispatch();
  const { category, lecture }: { category: number, lecture: number } = useSelector(({ entities }: any) => entities.exercise);
  const [state, setState] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number | null>();
  const [results, setResults] = useState<any[]>([]);
  const [next, setNext] = useState(0);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [active, setActive] = useState(false);
  const [cleanUp, setCleanUp] = useState<number[]>([]);
  const unMount = useRef<any[]>();
  unMount.current = cleanUp;
  const gameLimit = 4;
  const cardLimit = 6;

  function nextRound() {
    const results: any[] = [];
    setResults(results);
    setCurrentRound(0);
    setAnswer(null);
    const totalLength = lesson[category].subLesson[lecture].text.length;
    const cards = Game.generateCards({ cardLimit, totalLength });
    setState(cards);
    Game.delay(2500, () => answerQuestion(cards, results), setCleanUp);
  }

  useEffect(() => () => {
    Sound.stop();
    unMount.current?.forEach((event) => clearTimeout(event))
  }, []);

  useEffect(() => {
    if (next < gameLimit) nextRound();
    else
      Game.endGame({
        result: (100 * (correct - incorrect)) / correct,
        exercise: "READING",
        dispatch,
        navigation,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  async function answerQuestion(state: number[], result: any[] = results): Promise<void> {
    const remainingState = state.filter((cur) => {
      const index = result.findIndex((el) => el?.input === cur);
      return index === -1 || result[index].answer !== "correct";
    });

    const answer = await Game.answerQuestion({
      state: remainingState,
      cardLimit: remainingState.length,
      silent: true,
    });
    setAnswer(answer);
    setActive(true);
  }

  const handlePress = useCallback(
    async (input: number): Promise<void> => {
      if (!active) return;
      setActive(false);
      await Game.playAudio(lecture, input);
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
    setResults(Game.setResult({ input, state, results, answer: "incorrect" }));
    await Game.incorrect();
    setIncorrect((prev) => prev + 1);
    setActive(true);
  }

  return (
    <View style={styles.reading}>
      <Text style={styles.textBlock}>
        {typeof answer === 'number' ? 
          Utilities.searchData({ 
            category, lecture, exercise: answer, language: TARGETLANGUAGE
          }) : 
          "?"
        }
      </Text>
      <View style={styles.select}>
        {state.map((cur, index) => (
          <Card
            key={cur}
            state={cur}
            lecture={lecture}
            exercise={cur}
            onPress={handlePress}
            answer={results[index]?.answer}
            active={active}
          />
        ))}
      </View>
      <GameFooter
        correct={correct}
        incorrect={incorrect}
        active={active}
        Sound={Sound}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  reading: {
    padding: 25,
    flex: 1,
  },
  textBlock: {
    backgroundColor: 'rgb(5, 77, 84)',
    color: 'cornsilk',
    padding: 10,
    borderRadius: 3,
    fontSize: 25,
    // fontFamily: 'serif',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  select: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    borderRadius: 3,
    height: '80%',
    padding: 0,
    flexDirection: 'row',
  }
});

export default ReadingScreen;