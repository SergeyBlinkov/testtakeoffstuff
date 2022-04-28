import {createSlice} from "@reduxjs/toolkit";


export const createUserSlice = createSlice({
    name: 'user',
    initialState : {
        isLoading:false,
        isRegister:false,
        errs: {message: ''}
    },
    reducers : {
        createUserReq: (state,action) => {
            return {...state,
            isLoading:true
            }
        },
        createUserSuccess: (state) => {
            return {...state,
            isLoading:false,
            isRegister:true}
        },
        createUserFailure: (state,action) => {
            return {...state,
            isLoading:false,
            errs:action.payload}
        }
    }
})
export const {createUserReq,createUserFailure,createUserSuccess} = createUserSlice.actions

export default createUserSlice.reducer