import React, { memo, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";

import { lesson } from "../../data.json";
import colors from "../config/colors";
import routes from "../navigation/routes";
import { NATIVELANGUAGE } from "../utilities/constant";
import * as constant from "../utilities/constant";
import Utilities from "../utilities/utilities";

let cardPercent = '25%';
const cardSizeTask = { [routes.EASY]: '45%', [routes.HARD]: '26%', [routes.MEMORY]: '23%', [routes.READING]: '25%', [routes.RAPID]: '21%' };
const doublePercent = (percent: string): string => parseInt(percent.replace('%', '')) * 2 + '%';
const convertPercentToNumber = (percent: string): number => parseFloat(percent.replace('%', '')) / 100

type Props = {
  state: number,
  lecture: number,
  exercise: number,
  onPress: (arg: number) => {},
  hide?: boolean,
  brightness?: boolean,
  answer: string,
  active: boolean
};

const Card = memo(function Card({
  state,
  lecture,
  exercise,
  onPress,
  hide,
  brightness,
  answer,
  active = true,
}: Props): React.ReactElement<Props> {
  const { category, task } = useSelector(({ entities }: any) => entities.exercise);
  useEffect(() => setLight(brightness), [brightness])

  const taskString = task[0] + task.slice(1).toLowerCase();
  cardPercent = cardSizeTask[taskString];
  const [light, setLight] = useState(brightness);
  const text = Utilities.findTextBlock({ category, lecture, exercise });

  const handlePress = () => {
    if (answer || !active) return;
    setLight(true);
    onPress(state);
    setTimeout(() => {
      setLight(brightness);
    }, 4000);
  };

  const ImageSource = hide && !answer ? View : Utilities.findImage(category, lecture, exercise);
  const Img = () => typeof ImageSource === "number" ? <Image source={ImageSource} style={styles.img} /> : <ImageSource width="100%" height={convertPercentToNumber(cardPercent) * 385} />;
  const type: "NATIVELANGUAGE" | "TARGETLANGUAGE" = lesson[category].subLesson[lecture].type;

  const fontSize = text[NATIVELANGUAGE].length < 19 ? 25 - text[NATIVELANGUAGE].length : 12;
  const color = hide ? colors.white : colors.black;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: !hide && light ? `rgba(0, 0, 0, 0.2)` : colors.white }, { minHeight: cardPercent, width: cardPercent }]}
      // style={[styles.card, !hide && light ? { filter: `brightness(${light})` } : {}, { height: cardPercent, width: cardPercent }]}
      onPress={handlePress}
    >
      {!!answer && (
        <View style={styles.cardAnswer}>
          <Entypo
            size={routes.EASY === taskString ? 140 : 90}
            name={answer === "correct" ? 'check' : 'cross'}
            color={answer === "correct" ? 'green' : 'red'}
          />
        </View>
      )}
      {!hide && type ? 
        <View style={{ minWidth: doublePercent(cardPercent) }}>
          <Text style={styles.cardLargeText}>
            {text[constant[type]]}
          </Text>
        </View> :
        <>
          <Img />
          <View style={styles.cardTextContainer}>
            <Text style={[styles.cardText, { color }, { fontSize }]}>
              {text[NATIVELANGUAGE]}
            </Text>
          </View>
        </>
      }
    </TouchableOpacity>
  );
});

export default Card;

const styles = StyleSheet.create({
  card: {
    minHeight: 150, /* This is temp */
    marginVertical: '3%',
    marginHorizontal: '2%',
    borderRadius: 3,
    // backgroundColor: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'cornsilk',
    flexDirection: 'column',
    textAlign: 'center',
    position: 'relative',
    // marginVertical: '0.75%',
    // marginHorizontal: '2.5%',
    // boxShadow: 0 0 0rem 0.125rem rgba(0, 0, 0, 0.178),
  },
  img: {
    width: '100%',
    height: convertPercentToNumber(cardPercent) * 385,
    resizeMode: 'cover',
    marginBottom: 'auto',
    // backgroundPosition: 'center',
    // height: '67%',
    // backgroundSize: 'cover',
  },
  cardAnswer: {
    position: 'absolute',
    zIndex: 1,
  },
  cardTextContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 20,
  },
  cardLargeText: {
    fontSize: 40,
    textAlign: 'center',
  },
});