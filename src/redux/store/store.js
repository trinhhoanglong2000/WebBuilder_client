import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from '../rootReducer/index';

const store = configureStore({
    reducer: rootReducer
})

export default store;