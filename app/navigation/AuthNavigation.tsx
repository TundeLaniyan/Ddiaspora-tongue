import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import routes from './routes';
import HomeScreen from '../screen/HomeScreen';
import SignUpScreen from '../screen/SignUpScreen';
import SignInScreen from '../screen/SignInScreen';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.WELCOME} 
      screenOptions={{ headerTitleStyle: styles.headerTitleStyle}}
    >
      <Stack.Screen
        name={routes.WELCOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={routes.SIGNUP} component={SignUpScreen} />
      <Stack.Screen name={routes.SIGNIN} component={SignInScreen} />
    </Stack.Navigator>
  )
};

export default StackNavigator;

const styles = StyleSheet.create({
  headerTitleStyle: {
    // fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#6FCF97',
  }
})