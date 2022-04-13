import React, { ReactElement } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import colors from '../config/colors';

type Props = {
  style?: any,
  title: string,
  styleText?: any,
  onPress?: any,
};

function Button({ style, styleText, title, onPress, ...props }: Props): ReactElement<Props> {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.button, style]} {...props}>
        <Text style={[styles.text, styleText]}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 33,
    paddingHorizontal: 10,
    backgroundColor: '#054d54',
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    // display: block,
  },
  text: {
    // fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 33,
    letterSpacing: 1,
    color: colors.white,
    textAlign: 'center',
  }
});

export default Button;
