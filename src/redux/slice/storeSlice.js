import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callAPIWithGetMethod, callAPIWithPostMethod } from "../../helper/callAPI";

export const getInitDataStore = createAsyncThunk(
    'store/get',
    async (storeId) => {
        const result = await callAPIWithGetMethod("stores/" + storeId + "/init-data", true);
        return result.data;
    }
);

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        logoURL: null,
        templateName: null,
        storeCssData: {},
        listPagesId: [],
    },
    reducers: {
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
            callAPIWithPostMethod("stores/css/" + action.payload.storeId, { data: state.storeCssData }, true);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInitDataStore.pending, (state) => {
            
        })
        builder.addCase(getInitDataStore.fulfilled, (state, action) => {
            state.logoURL = action.payload.logoURL;
            state.listPagesId = action.payload.listPagesId;
            state.storeCssData = action.payload.storeCssData;
            state.templateName = action.payload.template;
        })
        builder.addCase(getInitDataStore.rejected, (state, action) => {
            // Tat loader
        })
    }
})

const { actions, reducer } = storeSlice;
export const { doSwitchStore, doSwitchStoreCssData, doSwitchLogoURL, doSwitchListPagesId, doSaveStoreData, doAddImageUpload } = actions;
export default reducer;