import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux'

import { categorySelect } from '../../store/exercise';
import routes from '../navigation/routes';

type Props = {
  navigation: any;
  title: string;
  Image: any;
  style: any,
  category: number
};

function SelectionCard({ navigation, title, Image, style, category }: Props): React.ReactElement<Props> {
  const dispatch = useDispatch()
  
  const handlePress = () => {
    dispatch(categorySelect(category));
    navigation.navigate(routes.LEARNING);
  }
  
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      <Image width='100%' height='70%' />
      <View style={styles.categoryContent}>
        <Text style={styles.categoryTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 5,
    marginVertical: 10,
    textAlign: 'center',
    width: 160,
    height: 160
    // boxShadow: 0 0 10 rgb(0, 0, 0 / 25%),
    // marginHorizontal: 10,
    // padding: 30,
    // height: '40%',
    // width: '35%',
  },
  categoryContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%',
  },
  categoryTitle: {
    // font-family: Gilroy-Black,
    fontSize: 21,
    fontWeight: '300',
    lineHeight: 21,
    color: '#333333',
  }
});

export default SelectionCard;