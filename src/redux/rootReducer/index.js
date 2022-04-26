import { combineReducers } from "@reduxjs/toolkit";
import login from './../slice/loginSlice';
import store from './../slice/storeSlice';

export const rootReducer = combineReducers ({
    login,
    store,
})