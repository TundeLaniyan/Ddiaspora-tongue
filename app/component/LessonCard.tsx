import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { lectureSelect } from '../../store/exercise';
import colors from '../config/colors';
import routes from '../navigation/routes';
import Progress from './Progress';


type Props = {
  navigation: any;
  title: string;
  percentage: number;
  Image: any;
  lecture: number;
};

function LessonCard({ navigation, title, percentage, Image, lecture }: Props): React.ReactElement<Props> {
  const dispatch = useDispatch()

  const handlePress = () => {
    dispatch(lectureSelect(lecture))
    navigation.navigate(routes.TASK);
  }

  
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image height='100%' width='33%' style={styles.lessonImg} />
      <View style={styles.lessonInfo}>
        <View style={styles.lessonContent}>
          <Text style={styles.lessonTitle}>{title}</Text>
        </View>
        <Progress percentage={percentage} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.25),
    borderRadius: 5,
    marginVertical: 15,
    padding: 20,
    height: 127,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonImg: {
    marginRight: 15,
  },
  lessonInfo: {
    flex: 1
  },
  lessonTitle: {
    // fontFamily: 'Gilroy-Black',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
    color: colors.text,
  }
});

export default LessonCard;