import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'exercise',
    initialState: {
        category: 0,
        lecture: 0,
        task: '',
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
    }
});

export const { categorySelect, lectureSelect, taskSelect } = slice.actions;
export default slice.reducer;