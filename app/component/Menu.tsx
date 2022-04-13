import React, { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from "../component/Button";

type Props = {
  auto: any;
  setAuto: any;
  random: any;
  setRandom: any;
  autoPlay: any;
  setAutoPlay: any;
};

function Menu({ auto, setAuto, random, setRandom, autoPlay, setAutoPlay }: Props): ReactElement<Props> {
  return (
    <View style={styles.menu}>
      <Button
        style={styles.button}
        onPress={() => setRandom(random ? false : true)}
        title={random ? "Normal " : "Random"}
      />
      <Button
        style={styles.button}
        onPress={() => setAutoPlay(!autoPlay)}
        title={autoPlay ? " Stop Auto Play" : "Start Auto Play"}
      />
      <Button
        style={styles.button}
        onPress={() => setAuto(!auto)}
        title={auto ? " Auto   " : "Manual"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    marginTop: 2.5,
    justifyContent: 'center',
    marginBottom: 2.5,
    flexDirection: 'row',
  },
  btn: {
    paddingVertical: 12.5, 
    paddingHorizontal: 25,
    textTransform: 'capitalize',
    fontSize: 700,
    borderRadius: 1,
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 1,
    height: 80,
    lineHeight: 80,
    // fontFamily: Gilroy-Medium,
    fontSize: 22,
    paddingHorizontal: 15,
  }
  
});

export default Menu;