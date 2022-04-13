import React, { ReactElement } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import images from '../utilities/images';
import { lesson } from '../../data.json';
import SelectionCard from '../component/SelectionCard';
import colors from '../config/colors';


type Props = {
  navigation: any
};

function CategorySelectScreen({ navigation }: Props): ReactElement<Props> {
  return (
    <ScrollView style={styles.category}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subTitle}>Choose your catergory and procceed to start learining youruba</Text>
      <View style={styles.container}>
        {lesson.map((cur, index) =>
          <SelectionCard 
            key={index}
            category={index}
            style={index === lesson.length - 1 && styles.containerLast}
            title={cur.title} 
            Image={images(cur.title)}
            navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  category: {
    backgroundColor: colors.mediumLight,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // alignContent: 'space-between',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginVertical: 50,
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  title: {
    // fontFamily: Sansation,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 50,
    textTransform: 'uppercase',
    // color: '#704b3f',
    marginBottom: 20,
    // fontFamily: Gilroy-Medium,
    color: colors.header,
  },
  subTitle: {
    // fontFamily: Sansation,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    // lineHeight: 16,
    color: colors.text,
  }, 
  containerLast: {
    marginHorizontal: '25%'
  },
});

export default CategorySelectScreen;