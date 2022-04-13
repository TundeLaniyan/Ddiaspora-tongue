import { ReactElement } from 'react';
import { View, StyleSheet, Text } from 'react-native';

type Props = {
  percentage: number
};

function Progress({ percentage }: Props): ReactElement<Props> {
  return (
    <View>
      <Text style={styles.text}>{Math.round(percentage)}% completed</Text>
      <View style={styles.bar}>
        <View style={[styles.barPercentage, { width: percentage + "%" }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#219653',
    fontWeight: '700',
  },
  bar: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginVertical: 5,
    // margin: .5rem 0,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barPercentage: {
    height: 6,
    backgroundColor: '#6FCF97',
  }
});

export default Progress;