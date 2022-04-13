import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import FeedNavigation from './FeedNavigation';
import routes from './routes';
// import navigation from './rootNavigation';
// import HomeScreen from '../screen/HomeScreen';
import LearningScreen from '../screen/LearningScreen';
import AccountScreen from '../screen/AccountScreen';
import CategorySelectionScreen from '../screen/CategorySelectionScreen';
import LessonSelectionScreen from '../screen/LessonSelectionScreen';
import colors from '../config/colors';
import LearningNavigation from './LearningNavigation';
import { URL } from '../utilities/constant';
import { loadProgress } from '../../store/progress';
import GameLogic from '../utilities/gameLogic';
import StoreContext from '../../context/gameLogicContext';

const Tab = createBottomTabNavigator();
const AppNavigator = () => {

  const dispatch = useDispatch();
  const { email } = useSelector(({ user }: any) => user)
  const { category, lecture } = useSelector(({ entities }: any) => entities.exercise)

  const gameLogic = new GameLogic(category, lecture);

  useEffect(() => {
    gameLogic.category = category;
    gameLogic.lecture = lecture;
  }, [category, lecture])

  const getInitialProgressState = async () => {
    let saveState;
    try {
      const value = await AsyncStorage.getItem(`${URL}${email}`);
      saveState = value ||  "{}";
    } catch(error) { saveState =  "{}"; }
    const objectState = saveState !== "[object Object]" ? JSON.parse(saveState) : {};
    return objectState?.progress || {};
  }

  (async () => dispatch(loadProgress(await getInitialProgressState())))();

  return (
    <StoreContext.Provider value={gameLogic}>
      <Tab.Navigator
        initialRouteName={routes.HOME}
        screenOptions={{ 
          headerTitleStyle: styles.headerTitle,
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: "grey",
          tabBarStyle: [{ "display": "flex" }, null]
        }}
      >
        <Tab.Screen
          name={routes.HOME}
          component={CategorySelectionScreen}
          options={{ tabBarIcon: ({ color, size }) => 
            <MaterialCommunityIcons name='home' color={color} size={size} /> 
          }}
        />
        <Tab.Screen
          name={routes.LEARNING}
          component={LearningNavigation}
          options={{ 
            headerShown: false,
            tabBarIcon: ({ color, size }) => 
            <MaterialCommunityIcons name='book' color={color} size={size} /> 
          }}
        />
        <Tab.Screen
          name={routes.ACCOUNT}
          component={AccountScreen}
          options={{ tabBarIcon: ({ color, size }) => 
            <MaterialCommunityIcons name='account' color={color} size={size} /> 
          }}
        />
      </Tab.Navigator>
    </StoreContext.Provider>
  )
};

export default AppNavigator;

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