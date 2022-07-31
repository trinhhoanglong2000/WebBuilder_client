import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callAPIWithGetMethod, callAPIWithPostMethod } from "../../helper/callAPI";
import { setAttribute } from '../../helper/utils';

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
        templateName: null,
        storeComponents: {},
        targetBase64Image: {},
        listPagesId: [],
    },
    reducers: {
        doAddTargetImage(state, action) {
            let targetBase64Image  = { ...state.targetBase64Image}
            targetBase64Image[action.payload.id] = action.payload.target;

            state.targetBase64Image = targetBase64Image;
        },
        doSaveStoreData(state, action) {
            callAPIWithPostMethod("stores/save-store-data/" + action.payload.storeId, { storeComponents: action.payload.storeComponents}, true);
        },
        doRenderImage(state, action){
            if (state.targetBase64Image[action.payload.id]) {
                setAttribute(state.targetBase64Image[action.payload.id], {'src': action.payload.image})
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getInitDataStore.fulfilled, (state, action) => {
            if (action.payload) {
                state.listPagesId = action.payload.listPagesId;
                state.storeComponents = action.payload.storeComponents;
                state.templateName = action.payload.template;
            }
        })
    }
})

const { actions, reducer } = storeSlice;
export const { doAddTargetImage, doSaveStoreData, doRenderImage } = actions;
export default reducer;