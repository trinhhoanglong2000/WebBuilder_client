import { createSlice } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        storeId: "621b5a807ea079a0f7351fb8",
        logoURL: "/img/FirstSlideHomePage.png",
        listPagesId: null,
        storeCssData: null,
        isEdited: false,
    },
    reducers: {
        doSwitchStore(state, action) {
            state.storeId = action.payload;
        }, 
        doSwitchStoreCssData(state, action) {
            state.storeCssData = action.payload;
        },
        doSwitchLogoURL(state, action) {
            state.logoURL = action.payload;
        },
        doSwitchListPagesId(state, action) {
            state.listPagesId = action.payload;
        },
        doSwitchListEditedState(state, action) {
            state.isEdited = action.payload;
        }
    }
})

const { actions, reducer } = storeSlice;
export const { doSwitchStore, doSwitchStoreCssData, doSwitchLogoURL, doSwitchListPagesId, doSwitchListEditedState } = actions;
export default reducer;