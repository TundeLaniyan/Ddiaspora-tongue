import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sound',
  initialState: { audioText: '' },
  reducers: {
    setSound: (sound, action) => { 
      sound.audioText = action.payload;
    }
  }
})

export const { setSound } = slice.actions;
export default slice.reducer;