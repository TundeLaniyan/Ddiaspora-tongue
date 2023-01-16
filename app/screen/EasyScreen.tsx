import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactElement,
  useContext,
} from "react";
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import { lesson } from "../../data.json";
import { setProgress } from "../../store/progress";
import GameFooter from "../component/Footer";
import Sound from "../utilities/Sound";
import Card from "../component/Card";
import StoreContext from "../../context/gameLogicContext";
import GameLogic from "../utilities/gameLogic";

type Props = {
  navigation: any
};

function EasyScreen({ navigation }: Props): ReactElement<Props> {
  const Game: GameLogic = useContext(StoreContext);
  const dispatch = useDispatch()
  const { category, lecture }: { category: number, lecture: number } = useSelector(({ entities }: any) => entities.exercise);
  
  const ACCENT = false; //lecture < 3 && category === 0;
  const [state, setState] = useState<number[]>([]);
  const [soundState, setSoundState] = useState<number>();
  const [answer, setAnswer] = useState<number>();
  const [results, setResults] = useState<{ input: number; answer: "correct" | "incorrect";}[]>([]);
  const [next, setNext] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [active, setActive] = useState(false);
  const [cleanUp, setCleanUp] = useState<number[]>([]);
  const buttonRef = createRef();
  const unMount = useRef<any[]>();
  unMount.current = cleanUp;
  const gameLimit = ACCENT ? lesson[category].subLesson[lecture].text.length / 3 : 10;
  const gameSpeed = 3500;
  const cardLimit = ACCENT ? 3 : 4;

  useEffect(
    () => () => {
      Sound.stop();
      unMount.current?.forEach((event) => clearTimeout(event))
    },
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => nextResponse(), [next]);

  // useEffect(() => buttonRef.current?.scrollIntoView({ behaviour: "smooth" }));

  const shuffleCards = (card: number[]): number[] =>
    [...card].sort(() => (Math.random() > 0.5 ? 1 : -1));

  async function answerQuestion(state: number[]): Promise<void> {
    setState((prevState) => shuffleCards(prevState));
    const answer = await Game.answerQuestion({ state, cardLimit, dispatch });
    setAnswer(answer);
    setActive(true);
  }

  function nextResponse() {
    if (next < gameLimit) nextRound();
    else {
      const result = (gameLimit * 100) / (gameLimit + incorrect);
      Game.endGame({
        result,
        exercise: "EASY",
        navigation,
        dispatch
      });
    }
  }

  function nextRound() {
    setState([]);
    setResults([]);
    const totalLength: number = lesson[category].subLesson[lecture].text.length;
    const cards = ACCENT
      ? [next * 3, next * 3 + 1, next * 3 + 2]
      : Game.generateCards({ cardLimit, totalLength });
    setState(cards);
    const delay = Game.playCards({
      cards,
      cardLimit,
      gameSpeed,
      setSoundState,
      setCleanUp,
      dispatch,
      autoPlay: true,
    });
    Game.delay(delay, () => answerQuestion(cards), setCleanUp);
  }

  const handlePress = useCallback(
    async (input) => {
      if (!active && typeof answer !== 'number') return;
      await Game.playAudio(lecture, input, dispatch);
      setActive(false);
      const CORRECT = input === answer;
      if (CORRECT) {
        setResults(
          Game.setResult({ input, state, results, answer: "correct" })
        );
        await Game.correct();
        setNext((prev) => prev + 1);
      } else {
        setResults(
          Game.setResult({ input, state, results, answer: "incorrect" })
        );
        await Game.incorrect();
        incorrectInput();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, answer]
  );

  function incorrectInput() {
    if (active && typeof answer === 'number') {
      Game.playAudio(lecture, answer, dispatch)
      setIncorrect((prev) => prev + 1);
      setActive(true);
    }
  }

  return (
    <View style={[styles.easyGame, ACCENT && styles.easyGameAccent]}>
      <View style={[styles.select, ACCENT && styles.selectAccent]}>
        {state.map((cur, index) => (
          <Card
            key={index}
            state={cur}
            lecture={lecture}
            exercise={cur}
            onPress={handlePress}
            brightness={index === soundState ? false : true}
            answer={results?.[index]?.answer}
            active={active}
          />
        ))}
      </View>
      <View style={{ marginBottom: 90 }} />
      <GameFooter
        audio={typeof answer === 'number' ? Game.getAudio(lecture, answer): "undefined"}
        correct={next}
        incorrect={incorrect}
        active={active}
        noText={ACCENT}
        Sound={Sound}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  easyGame: {
    display: 'flex',
    padding: 15,
    flex: 1,
  },
  easyGameAccent: {
    alignItems: 'center',
  },
  select: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'space-around',
    flexWrap: 'wrap',
    overflow: 'scroll',
    width: '100%',
    flexDirection: 'row',
    // border: 2.5px solid rgba(0, 0, 0, 0.178),
},
  selectAccent: {
    alignItems: 'center',
  },
  easyGameButton: {
    marginVertical: 20,
    marginHorizontal: 0,
    // margin: 2rem 0,
    height: 80,
    lineHeight: 80,
    // fontFamily: Gilroy-Medium,
    fontSize: 22,
  }
});

export default EasyScreen;
