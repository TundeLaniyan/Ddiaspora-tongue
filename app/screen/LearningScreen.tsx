import { ReactElement } from 'react';
import { View, StyleSheet, Text } from 'react-native';


function LearningScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <Text>Learning</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default LearningScreen;