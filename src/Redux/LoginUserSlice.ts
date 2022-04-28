import {createSlice} from "@reduxjs/toolkit";

export interface LoginUserType {
    isLogged:boolean;
    isLoading:boolean;
    user:object;
    errs: {
        message:string;
    };
}
const iniState:LoginUserType = {
    isLogged: false,
    isLoading: false,
    user: {},
    errs: {message: ''}
}
export const LoginUserSlice = createSlice({
    name: 'userLogin',
    initialState: iniState,
    reducers :{
        loginUserReq: (state,action) => {
            state.isLoading = true
        },
        loginUserSuccess: (state,action) => {
            state.user = action.payload
            state.isLoading = false
            state.isLogged = true
        },
        loginUserFailure: (state,action) => {
            state.isLoading = false
            state.errs = action.payload
        }

    }
})
export const {loginUserReq,loginUserFailure,loginUserSuccess} = LoginUserSlice.actions

export default LoginUserSlice.reducer