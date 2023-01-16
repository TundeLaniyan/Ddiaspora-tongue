import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import routes from './routes';
import LessonSelectionScreen from '../screen/LessonSelectionScreen';
import TaskSelectionScreen from '../screen/TaskSelectionScreen';
import { StyleSheet } from 'react-native';
import colors from '../config/colors';
import EasyScreen from '../screen/EasyScreen';
import HardScreen from '../screen/HardScreen';
import MemoryScreen from '../screen/MemoryScreen';
import ReadingScreen from '../screen/ReadingScreen';
import RapidScreen from '../screen/RapidScreen';
import ExerciseScreen from '../screen/ExerciseScreen';
import EndGameScreen from '../screen/EndGameScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const LearningNavigation = () => {
  const { navigation } = useSelector((state: any) => state.entities.exercise)

  return (
    <Stack.Navigator 
      initialRouteName={routes.SELCT} 
      screenOptions={{ headerShown: navigation, headerTitleStyle: styles.headerTitle }}
    >
      <Stack.Screen name={routes.SELCT} component={LessonSelectionScreen} />
      <Stack.Screen name={routes.TASK} component={TaskSelectionScreen} />
      <Stack.Screen name={routes.EASY} component={EasyScreen} />
      <Stack.Screen name={routes.MEMORY} component={MemoryScreen} />
      <Stack.Screen name={routes.HARD} component={HardScreen} />
      <Stack.Screen name={routes.READING} component={ReadingScreen} />
      <Stack.Screen name={routes.RAPID} component={RapidScreen} />
      <Stack.Screen name={routes.EXERCISE} component={ExerciseScreen} />
      <Stack.Screen name={routes.ENDGAME} component={EndGameScreen} />
    </Stack.Navigator>
  )
}

export default LearningNavigation;

const styles = StyleSheet.create({
  headerTitle: {
    // fontFamily: 'Gilroy',
    // fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 16,
    textTransform: 'uppercase',
    color: colors.green,
  }
});