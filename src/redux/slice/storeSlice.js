import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callAPIWithGetMethod, callAPIWithPostMethod } from "../../Utils/callAPI";

export const getInitDataStore = createAsyncThunk(
    'store/get',
    async (storeId) => {
        const result = await callAPIWithGetMethod("stores/" + storeId + "/pages", true);
        return result.data;
    }
);

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        storeId: "621b5a807ea079a0f7351fb8",
        logoURL: "/img/FirstSlideHomePage.png",
        //logoURL: null,
        listPagesId: null,
        storeCssData: {}
    },
    reducers: {
        doSwitchStore(state, action) {
            state.storeId = action.payload;
        }, 
        doSwitchStoreCssData(state, action) {
            let newStoreCssData  = { ...state.storeCssData}
            for (let key in action.payload) {
                newStoreCssData[key] = action.payload[key];
            }
            state.storeCssData = newStoreCssData;
        },
        doSwitchLogoURL(state, action) {
            state.logoURL = action.payload;
        },
        doSaveStoreData(state, action) {
            callAPIWithPostMethod("stores/css/" + state.storeId, { data: state.storeCssData }, true);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInitDataStore.pending, (state) => {
            // Hien thi loader
        })
        builder.addCase(getInitDataStore.fulfilled, (state, action) => {
            //state.logoURL = action.payload.logoURL;
            state.listPagesId = action.payload;
            //state.storeCssData = action.payload.storeCssData;
        })
        builder.addCase(getInitDataStore.rejected, (state, action) => {
            // Tat loader
        })
    }
})

const { actions, reducer } = storeSlice;
export const { doSwitchStore, doSwitchStoreCssData, doSwitchLogoURL, doSwitchListPagesId, doSaveStoreData } = actions;
export default reducer;