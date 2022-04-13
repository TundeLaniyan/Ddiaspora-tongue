import React, { ReactElement } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { taskSelect } from '../../store/exercise';
import {assetImage} from '../utilities/images';
import routes from '../navigation/routes';
import Utilities from '../utilities/utilities';

type Props = {
  navigation: any;
  task: string;
  progress: number;
};

function TaskCard({ navigation, task, progress }: Props): ReactElement<Props> {
  const dispatch = useDispatch()
  const Icon = assetImage(task);
  const AdvanceSvg = assetImage("advance");

  const handlePress = () => {
    dispatch(taskSelect(task));
    navigation.navigate(routes[task]);
  };

  return (
    <View style={styles.taskContainer}>
      <Icon width={50}/>
      <Text style={styles.taskChallenge}>{task}</Text>
      { task !== 'EXERCISE' && <Text style={styles.taskProgress}>{progress}%</Text> }
      <TouchableOpacity onPress={handlePress}>
        <AdvanceSvg style={styles.tasksIcon} width={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    borderStyle: 'solid',
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  taskChallenge: {
    marginRight: 'auto',
    // margin: 0 auto 0 5rem,
    // fontFamily: Gilroy-Medium,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    color: '#333333',
    textTransform: 'capitalize',
  },
  taskProgress: {
    marginRight: 20,
    color: '#1a9842',
  },
  tasksIcon: {
    width: 40,
  }
});

export default TaskCard;