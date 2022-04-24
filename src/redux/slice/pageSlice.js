import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        pageId: null,
    },
    reducers: {
        doSwitchPage(state, action) {
            state.pageId = action.payload;
        }
    }
})

const {actions, reducer} = pageSlice;
export const {doSwitchPage} = actions;
export default reducer;