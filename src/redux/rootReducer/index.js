import { combineReducers } from "@reduxjs/toolkit";
import page from './../slice/pageSlice';

export const rootReducer = combineReducers ({
    page
})