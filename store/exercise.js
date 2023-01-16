import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'exercise',
    initialState: {
        category: 0,
        lecture: 0,
        task: '',
        navigation: true,
    },
    reducers: {
        categorySelect: (exercise, action) => {
            exercise.category = action.payload;
        },
        lectureSelect: (exercise, action) => {
            exercise.lecture = action.payload;
        },
        taskSelect: (exercise, action) => {
            exercise.task = action.payload;
        },
        disableNavigation: (exercise) => {
            exercise.navigation = false;
        },
        enableNaviagtion: (exercise) => {
            exercise.navigation = true;
        },
    }
});

export const { categorySelect, lectureSelect, taskSelect, disableNavigation, enableNaviagtion } = slice.actions;
export default slice.reducer;