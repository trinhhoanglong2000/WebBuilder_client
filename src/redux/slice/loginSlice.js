import { createSlice } from '@reduxjs/toolkit';
import { readCookie } from '../../helper/cookie';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: readCookie('token') != null
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