import { combineReducers } from "@reduxjs/toolkit";
import login from './../slice/loginSlice';
import store from './../slice/storeSlice';
import page from './../slice/pageSlice';

export const rootReducer = combineReducers ({
    login,
    store,
    page,
})