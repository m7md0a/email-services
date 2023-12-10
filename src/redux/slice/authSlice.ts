'use client';
import { UserDateType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type User = {
    user: UserDateType | null,
}


export const auth =  createSlice({
       name:'user',
       initialState: {
           user: null,
       } as User,
       reducers: {
           logout: (state) => {
               localStorage.removeItem('user');
               state.user = null  
           },
           login: (state, action: PayloadAction<UserDateType>) => {
               localStorage.setItem('user', JSON.stringify(action.payload));
               state.user = action.payload
           },
           reload(state, action: PayloadAction<UserDateType | null>) {
            state.user = action.payload
           }
       }
    });


export const {login, logout, reload} = auth.actions;
export default auth.reducer;
