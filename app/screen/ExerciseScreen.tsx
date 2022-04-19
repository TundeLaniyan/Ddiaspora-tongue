import React, { ReactElement, useEffect, useState, useRef, useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";

import Slider from "../component/Slider";
import Menu from "../component/Menu";
import { lesson } from "../../data.json";
import StoreContext from '../../context/gameLogicContext';
import Utilities from '../utilities/utilities';
import GameLogic from '../utilities/gameLogic';
import sound from '../utilities/Sound';

function ExerciseScreen(): ReactElement {
  const Game: GameLogic = useContext(StoreContext);
  const { lecture, category }: { category: number, lecture: number } = useSelector(({ entities }: any) => entities.exercise);
  const [auto, setAuto] = useState(true);
  const [random, setRandom] = useState(false);
  const [exercise, setExercise] = useState(0);
  const currentExercise = useRef<any>();
  currentExercise.current = exercise;
  const [autoPlay, setAutoPlay] = useState(false);
  const [intervalId, setIntervalId] = useState<any>();
  const currentIntervalId = useRef();
  currentIntervalId.current = intervalId;
  const max = lesson[category].subLesson[lecture].text.length - 1;

  useEffect(() => () => {
    sound.stop();
    clearInterval(currentIntervalId.current)
  }, []);

  useEffect(() => {
    clearInterval(intervalId);
    if (autoPlay)
      setIntervalId(
        setInterval(
          () => setExercise((prev) => (prev < max ? prev + 1 : 0)),
          4000
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  const ImageSource = Utilities.findImage(category, lecture, exercise);

  return (
    <View style={styles.practice}>
      <View style={styles.practiceContent}>
        <TouchableOpacity onPress={() => Game.playAudio(lecture, exercise)}>
          {
            typeof ImageSource === "number" ?
              <Image style={styles.practiceImg} source={ImageSource} /> :
              <ImageSource height={250} width='100%' />
          }
        </TouchableOpacity>
        <Slider
          auto={auto}
          random={random}
          exercise={exercise}
          setExercise={setExercise}
          Game={Game}
        />
        <Menu
          auto={auto}
          setAuto={setAuto}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
          random={random}
          setRandom={setRandom}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  practice: {
    padding: 25,
    justifyContent: 'center',
    flex: 1,
  },
  practiceContent: {},
  practiceImg: {
    height: 250,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default ExerciseScreen;