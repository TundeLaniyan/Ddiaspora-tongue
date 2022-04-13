import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
// import images from '../assets/images';
import images from '../utilities/images';

import LessonCard from '../component/LessonCard';
import { lesson as lessons} from '../../data.json';
import colors from '../config/colors';
import Utilities from '../utilities/utilities';
// import { lectureSelect } from "../../store/exercise";
// import ProgressContainer from "../progressContainer";

type Props = {
  navigation: any;
};

function LessonSelectionScreen({ navigation }: Props): React.ReactElement<Props> {
  const { progress, exercise: { category, lesson }} = useSelector(({ entities }: any) => entities);

  const topics = lessons[category].subLesson;
  const categoryTitle = lessons[category].title;
  
  const progressValue: any = progress.value[categoryTitle] || {};

  const progression = topics.map((progress) => {
    const noOfExercise = progress.tasks.length - 1;
    const exerciseList: number[] = Object.values(progressValue[progress.title] || []);
    
    const value = exerciseList.length ? exerciseList : [0];

    const percentage =
      value.reduce((total, current) => total + current) / noOfExercise;


    return { ...progress, percentage };
  });

  return (
    <ScrollView style={styles.container}>
      <View>
        {progression.map((progress, index) => (
          <LessonCard
            key={index}
            navigation={navigation}
            title={progress.title}
            percentage={progress.percentage}
            Image={images(progress.title)}
            lecture={index}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mediumLight,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 60,
  },
});

export default LessonSelectionScreen;