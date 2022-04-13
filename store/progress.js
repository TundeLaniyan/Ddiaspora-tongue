import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'progress',
  initialState: { value: {} },
  reducers: {
    setProgress: (progress, action) => {
      const { category, lecture, exercise, result } = action.payload;

      if (!progress.value[category]) progress.value[category] = {};
      if (!progress.value[category][lecture]) progress.value[category][lecture] = {};     
      if ((progress.value[category][lecture][exercise] || 0) <= result)
        progress.value[category][lecture][exercise] = result;
    },
    resetProgress: (progress) => {
      progress.value = {}
    },
    loadProgress: (progress, action) => {
      progress.value = action.payload;
    }
  }

})

export const { setProgress, resetProgress, loadProgress } = slice.actions;
export default slice.reducer;