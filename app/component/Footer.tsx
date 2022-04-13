import React, { useState, useEffect, ReactElement, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import StoreContext from '../../context/gameLogicContext';
import { useSelector } from 'react-redux';
import colors from '../config/colors';
import { Sound } from '../utilities/Sound';

type Props = {
  percent?: number;
  audio?: string;
  correct: number;
  incorrect: number;
  active: boolean;
  noText?: boolean;
  Sound: Sound;
};

function Footer({
  percent = 100,
  audio = 'N/A',
  correct,
  incorrect,
  active,
  noText,
  Sound,
}: Props): ReactElement<Props> {

  const Game = useContext(StoreContext);
  const { audioText }: { audioText: string; } = useSelector(({ entities }: any) => entities.sound);
  const [languageText, setLanguageText] = useState("");
  const fontSize = audioText.length < 19 ? 35 - audioText.length : 16;

  
  useEffect(() => {
    setLanguageText(audioText);
    const timeout = setTimeout(() => setLanguageText(""), 5500);
    return () => clearTimeout(timeout);
  }, [audioText]);
  
  useEffect(() => setLanguageText(""), []);

  return (
    <LinearGradient
      style={styles.gameFooter}
      colors={['#054d5459', '#054d54']}
      locations={[(100 - percent) / 100, (100 - percent) / 100]}
      end={{ x: 0, y: 0 }}
      start={{ x: 1, y: 0 }}
    >
      {audio !== 'N/A' && (
        <TouchableOpacity
          style={[styles.score, styles.scorePlay]}
          onPress={() => active && Sound.play(audio)}
        >
          <FontAwesome name="volume-up" size={20} color="cornsilk" />
        </TouchableOpacity>
      )}
      <Text style={[styles.languageText, { fontSize }]}>{languageText}</Text>
      <Text style={[styles.score, styles.scoreCorrect]}>{correct}</Text>
      <Text style={[styles.score, styles.scoreIncorrect]}>{incorrect}</Text>
    </LinearGradient>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  gameFooter: {
    position: 'absolute',
    bottom: 0,
    // left: 0,
    width: windowWidth,
    // marginLeft: '-10%',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    marginTop: 'auto'
  },
  languageText: {
    marginRight: 'auto',
    color: colors.white
  },
  score: {
    borderRadius: 20,
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 2.5,
    borderStyle: 'solid',
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: 2,
    fontSize: 24,
    overflow: 'hidden',
  },
  scorePlay: {
    backgroundColor: 'transparent',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreCorrect: {
    borderColor: 'green',
  },
  scoreIncorrect: {
    borderColor: 'red',
  }
});

export default Footer;