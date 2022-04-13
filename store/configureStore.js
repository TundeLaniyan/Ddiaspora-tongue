import { configureStore as store } from "@reduxjs/toolkit";

import reducer from "./reducer";
import logger from "./middleware/logger";
import sound from "./middleware/sound";
import saveProgress from "./middleware/saveProgress";
import { TARGETLANGUAGE } from "../app/utilities/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function configureStore () {
    return store({
        reducer,
        middleware: [logger, sound, saveProgress],
        // preloadedState: {
        //     entities: {
        //         progress: getInitialProgressState(),
        //     }
        // }
    })
};