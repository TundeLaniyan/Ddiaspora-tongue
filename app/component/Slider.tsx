import React, { useEffect, ReactElement } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useSelector } from "react-redux";

import { NATIVELANGUAGE, TARGETLANGUAGE } from "../utilities/constant";
import { lesson } from "../../data.json";
import Sound from "../utilities/Sound";
import Utilities from "../utilities/utilities";
import GameLogic from "../utilities/gameLogic";
import Svg from '../assets/return.svg';

type Props = {
  auto: any;
  random: any;
  exercise: any;
  setExercise: any;
  Game: GameLogic;
}

function Slider({ auto, random, exercise, setExercise, Game }: Props): ReactElement<Props> {
  const { lecture, category } = useSelector(({ entities }: any) => entities.exercise);
  const max = lesson[category].subLesson[lecture].text.length;

  useEffect(() => { 
    auto && Game.playAudio(lecture, exercise) 
  }, [exercise]);

  const randomNumber = (prev: number, value: number) => {
    if (random) return Math.ceil(Math.random() * max);
    return prev + value;
  };

  return (
    <View style={styles.slider}>
      <TouchableOpacity
        onPress={() => !(!random && exercise < 1) && setExercise((prev: number) => randomNumber(prev, -1))}
      >
        <View style={styles.btn}><Svg /></View>
      </TouchableOpacity>
      <View style={styles.sliderTextWidth}>
        <Text style={styles.sliderText}>
          {Utilities.searchData({ category, lecture, exercise, language: NATIVELANGUAGE })}
        </Text>
        <Text style={styles.sliderText}>
          {Utilities.searchData({ category, lecture, exercise, language: TARGETLANGUAGE })}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => !(!random && exercise >= max - 1) && setExercise((prev: number) => randomNumber(prev, 1))}
      >
        <View style={[styles.btn, styles.btnNext]}><Svg /></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  sliderText: {
    textAlign: 'center',
    // fontFamily: 'Gilroy-Bold',
    fontSize: 36,
    lineHeight: 42,
    color: '#333333',
  },
  sliderTextWidth: {
    maxWidth: '70%'
  },
  btn: {
    borderRadius: 25,
    borderColor: '#333333',
    borderWidth: 1,
    borderStyle: 'solid',
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  btnNext: { 
    transform: [{ rotate: '180deg' }],
  }
});

export default Slider;
