import {createSlice} from '@reduxjs/toolkit';

const initialState={
    currUser:null,
    error:null,
    loading:false 
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true 
        },
        signInSuccess:(state,action)=>{
            state.currUser=action.payload;
            state.loading=false;
            state.error=null  
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload  
        },
        updateUserStart:(state)=>{
            state.loading=true
        },
        updateUserSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.currUser={...state.currUser,...action.payload};
        },
        updateUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload 
        }
    }
})

export const {signInStart,signInSuccess,signInFailure,updateUserFailure,updateUserStart,updateUserSuccess}=userSlice.actions;

export default userSlice.reducer;