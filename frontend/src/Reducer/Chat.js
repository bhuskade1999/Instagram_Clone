// const chatReducer = (state = { chatUsers: [], loading: false, error: false }, action) => {
//     switch (action.type) {
//             case "SAVE_USER":
//                 return ({...state, chatUsers: [...state.chatUsers, action.data]});
//              default:
//                 return state
//     }} 
// export default chatReducer




import { createReducer } from "@reduxjs/toolkit";
const initialState = {}




export const chatReducer = createReducer(initialState,{
    createChatRequest :(state)=>{
        state.loading = true;
    },
    
    createChatSuccess :(state,action)=>{
        state.loading = false;
        state.chat = action.payload;
        state.isAuthenticated = true;
    },
    
    createChatFailure :(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    
    UserChatRequest :(state)=>{
        state.loading = true;
    },
    
    UserChatSuccess :(state,action)=>{
        state.loading = false;
        state.chat = action.payload;
        state.isAuthenticated = true;
    },
    
    UserChatFailure :(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    
    
    FindChatRequest :(state)=>{
        state.loading = true;
    },
    FindChatSuccess :(state,action)=>{
        state.loading = false;
        state.chat = action.payload;
        state.isAuthenticated = true;
    },
    FindChatFailure :(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    
    
    // clearErrors:(state) =>{
    //     state.error = null;
    // }
    
    })





    

export const messageReducer = createReducer(initialState,{
    getMsgRequest :(state)=>{
        state.loading = true;
    },
    
    getMsgSuccess :(state,action)=>{
        state.loading = false;
        state.msg = action.payload;
        state.isAuthenticated = true;
    },
    
    getMsgFailure :(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    
    addMsgRequest :(state)=>{
        state.loading = true;
    },
    
    addMsgSuccess :(state,action)=>{
        state.loading = false;
        state.msg = action.payload;
        state.isAuthenticated = true;
    },
    
    addMsgFailure :(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
     
    
    // clearErrors:(state) =>{
    //     state.error = null;
    // }
    
    })