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
        storeComponents: {},
        targetBase64Image: {},
        listPagesId: [],
    },
    reducers: {
        doSwitchLogoURL(state, action) {
            state.logoURL = action.payload;
        },
        doAddTargetImage(state, action) {
            let targetBase64Image  = { ...state.targetBase64Image}
            targetBase64Image[action.payload.id] = action.payload.target;

            state.targetBase64Image = targetBase64Image;
        },
        doSaveStoreData(state, action) {
            callAPIWithPostMethod("stores/save-store-data/" + action.payload.storeId, { logoUrl: action.payload.logoSrc, storeComponents: action.payload.storeComponents}, true);
        },
        doRenderImage(state, action){
            if (state.targetBase64Image[action.payload.id]) {
                state.targetBase64Image[action.payload.id].set('content', `<img src="${action.payload.image}" class="img-responsive img-fluid"/>`)
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getInitDataStore.fulfilled, (state, action) => {
            if (action.payload) {
                state.logoURL = action.payload.logoURL;
                state.listPagesId = action.payload.listPagesId;
                state.storeComponents = action.payload.storeComponents;
                state.templateName = action.payload.template;
            }
        })
    }
})

const { actions, reducer } = storeSlice;
export const { doSwitchLogoURL, doAddTargetImage, doSaveStoreData, doRenderImage } = actions;
export default reducer;