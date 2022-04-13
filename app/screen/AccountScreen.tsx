import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { signOutLocal } from '../../store/auth';

function AccountScreen(): React.ReactElement {
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(signOutLocal())
  }

  return (
    <View style={styles.container}>
      <Text>Account</Text>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Text>Sign Out</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default AccountScreen;