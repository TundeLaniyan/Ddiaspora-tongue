import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../../app/utilities/constant";
import { setProgress } from "../progress";

const storeData = async (value, email) => {
  try {
    const state = JSON.parse(await AsyncStorage.getItem(URL + email));
    state.progress = value;
    const stateValue = JSON.stringify(state);
    await AsyncStorage.setItem(URL + email, stateValue);
  } catch (error) {
    console.log(error);
  }
}

const saveProgress = store => next => async action => {
  if (action.type === setProgress.type) {
    const { entities, user } = store.getState();
    const { progress } = entities;
    const { category, exercise: task, lecture, result } = action.payload;
    
    const current = JSON.parse(JSON.stringify(progress));

    if (!current.value[category]) current.value[category] = {};
    if (!current.value[category][lecture]) current.value[category][lecture] = {};
    if (current.value[category][lecture][task] >= result) return;
    
    current.value[category][lecture][task] = result;
    await storeData(current.value, user.email);
  }

  next(action);
};

export default saveProgress;