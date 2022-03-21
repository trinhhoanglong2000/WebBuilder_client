import { createSlice } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        storeId: "621b5a807ea079a0f7351fb8",
        storeCssData: null
    },
    reducers: {
        doSwitchStore(state, action) {
            state.storeId = action.payload;
        }, 
        doSwitchStoreCssData(state, action) {
            state.storeCssData = action.payload;
        },
        doAddStoreCssData(state, action) {
            state.storeCssData = action.payload;
        }
    }
})

const {actions, reducer} = storeSlice;
export const {doSwitchStore, doSwitchStoreCssData, doAddStoreCssData} = actions;
export default reducer;