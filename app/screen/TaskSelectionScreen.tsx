import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from "react-redux";

import { lesson } from "../../data.json";
import Images from '../utilities/images';
import TaskCard from '../component/TaskCard';
import Utilities from '../utilities/utilities';

type Props = {
  navigation: any
};

function TaskSelectionScreen({ navigation }: Props): React.ReactElement<Props> {
  const { progress, exercise: { category, lecture } } = useSelector(({ entities }: any) => entities);
  const subLessonTitle = Utilities.toCamelcase(lesson[category].subLesson[lecture].title);
  const Image = Images(subLessonTitle);

  const categoryTitle = lesson[category].title;
  const lectureTitle = lesson[category].subLesson[lecture].title;
  
  return (
    <View style={styles.container}>
      <Image width='100%' height='40%' />
      <View style={styles.content}>
        <Text style={styles.title}>
          {lesson[category].title}: {lesson[category].subLesson[lecture].title}
        </Text>
        <Text style={styles.text}>Chose your task</Text>
        <View style={styles.select}>
          {lesson[category].subLesson[lecture].tasks.map((task) => (
            <TaskCard
              key={task}
              navigation={navigation}
              task={task}
              progress={progress.value[categoryTitle]?.[lectureTitle]?.[task]?.toFixed(1) || 0}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    // fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 30,
    color: '#704b3f',
  },
  text: {
    // fontFamily: Gilroy-Bold,
    fontSize: 24,
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 0,
    color: '#828282',
  },
  select: {
    width: '100%',
    marginTop: 'auto',
  }
});

export default TaskSelectionScreen;