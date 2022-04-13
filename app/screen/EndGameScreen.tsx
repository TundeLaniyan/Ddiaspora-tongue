import React, { ReactElement, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import routes from '../navigation/routes';

type Props = {
  route: { params: { percentage: number } }
  navigation: any;
};

function EndGameScreen({ navigation, route: { params: {percentage}} }: Props): ReactElement<Props> {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(opacity => opacity < 1 ? opacity + .025 : 1)
    }, 125);
    setTimeout(() => clearInterval(interval), 6000);
  }, [])

  const handlePress = () => navigation.navigate(routes.TASK);

  const result = percentage >= 75 ? 
    { color: colors.darkGreen , text: "CONGRATULATION" }: 
    percentage >= 55 ? 
    { color: "#eed573", text: "UNLUCKY" }: 
    { color: "#d55757", text: "FAIL" };

  const Children = () => (
    <View style={[styles.content, {opacity}]}>
      <View style={[styles.resultIcon, {backgroundColor: result.color}]}>
        <Text style={styles.resultText}>{Math.floor(percentage)}%</Text>
      </View>
      <Text style={[styles.title, {color: result.color}]}>{result.text}</Text>
    </View>
  );

  if (opacity === 1) {
    return (
      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <Children />
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.container}>
        <Children />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    // fontFamily: 'Gilroy-Bold',
    fontSize: 35,
    lineHeight: 40,
    textAlign: 'center',
    // color: colors.darkGreen,
  },
  resultIcon: {
    width: 200,
    height: 200,
    // backgroundColor: colors.darkGreen,
    marginVertical: 30,
    borderRadius: 100,
  },
  resultText: {
    // fontFamily: 'Gilroy-Bold',
    fontSize: 60,
    lineHeight: 200,
    textAlign: 'center',
    color: colors.white,
  }
});

export default EndGameScreen;