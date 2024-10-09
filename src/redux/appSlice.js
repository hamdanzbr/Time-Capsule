import { createSlice } from "@reduxjs/toolkit";

const appSlice=createSlice({
    name:'app',
    initialState:{
        isSignupPage:true
    },
    reducers:{
        changeSignupPage:(state,action)=>{
            state.isSignupPage=!state.isSignupPage
        }
    }
})

export const {changeSignupPage}=appSlice.actions
export default appSlice.reducer