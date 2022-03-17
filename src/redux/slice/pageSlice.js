import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        pageId: '621b62c74c17fb85f60c0c0a'
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