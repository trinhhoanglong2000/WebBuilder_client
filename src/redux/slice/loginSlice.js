import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: localStorage.getItem("token") != null
    },
    reducers: {
        doSwitchLoginState(state, action) {
            state.isLogin = action.payload;
        }
    }
})

const {actions, reducer} = loginSlice;
export const {doSwitchLoginState} = actions;
export default reducer;