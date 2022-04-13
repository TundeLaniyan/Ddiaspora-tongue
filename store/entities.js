import { combineReducers } from "redux";

import exerciseReducer from "./exercise";
import progressReducer from "./progress";
import soundReducer from "./sound";

export default combineReducers({
    exercise: exerciseReducer,
    progress: progressReducer,
    sound: soundReducer,
});