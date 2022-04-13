import { createSlice } from "@reduxjs/toolkit";

// const motherTongue = JSON.parse(localStorage.getItem("MotherTongue")) || {};
const motherTongue = {};

const slice = createSlice({
    name: 'auth',
    initialState: { email: undefined, name: undefined },
    reducers: {
        signInLocal: (user, action) => {
            user.name = action.payload.name;
            user.email = action.payload.email;
            // if (motherTongue[payload.email]?.password === payload.password) user = motherTongue[payload.email];
            // throw new Error("Details are incorrect");
        },
        signOutLocal: (user) => {
            user.name = undefined;
            user.email = undefined;
        }
        // signUpLocal: (user, payload) => {
        //     if (Object.keys(motherTongue).includes(payload.email)) throw new Error("User already exists");
        //     motherTongue[payload.email] = { name: payload.name, password: payload.password };
        //     const motherTongueString = JSON.stringify(motherTongue);
        //     localStorage.setItem("MotherTongue", motherTongueString);
        //     user = motherTongue[payload.email];
        // }
    }
});

// Action creators

// export const signUpLocal = (data) => {
//     if (Object.keys(motherTongue).includes(data.email)) throw new Error("User already exists");
//     motherTongue[data.email] = { name: data.name, password: data.password };
//     const motherTongueString = JSON.stringify(motherTongue);
//     localStorage.setItem("MotherTongue", motherTongueString);
//     return motherTongue[data.email];
// }

// export const signInLocal = (data) => {
//     if (motherTongue[data.email]?.password === data.password) return motherTongue[data.email];
//     throw new Error("Details are incorrect");
// }

export default slice.reducer;

export const { signInLocal, signOutLocal } = slice.actions;