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
        storeTraitData: {},
        listPagesId: [],
    },
    reducers: {
        doAddStoreTraitData(state, action) {
            let newStoreTraitData  = { ...state.storeTraitData}
            for (let key in action.payload) {
                newStoreTraitData[key] = action.payload[key];
            }
            state.storeTraitData = newStoreTraitData;
        },
        doSwitchLogoURL(state, action) {
            state.logoURL = action.payload;
        },
        doSaveStoreData(state, action) {
            callAPIWithPostMethod("stores/trait/" + action.payload.storeId, { traitData: state.storeTraitData }, true);
            callAPIWithPostMethod("stores/logoUrl/" + action.payload.storeId, { logoUrl: action.payload.logoImage }, true);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInitDataStore.pending, (state) => {
            
        })
        builder.addCase(getInitDataStore.fulfilled, (state, action) => {
            state.logoURL = action.payload.logoURL;
            state.listPagesId = action.payload.listPagesId;
            state.storeTraitData = action.payload.storeTraitData;
            state.templateName = action.payload.template;
        })
        builder.addCase(getInitDataStore.rejected, (state, action) => {
            // Tat loader
        })
    }
})

const { actions, reducer } = storeSlice;
export const { doSwitchStore, doAddStoreTraitData, doSwitchLogoURL, doSwitchListPagesId, doSaveStoreData, doAddImageUpload } = actions;
export default reducer;