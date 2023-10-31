import { createReducer } from "@reduxjs/toolkit"
const initialState = {}



export const likesReducer = createReducer(initialState, {
    likeRequest: (state) => {
        state.loading = true
    },
    likeSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    likeFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    addCommentRequest: (state) => {
        state.loading = true
    },
    addComentSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    addCommentFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    deleteCommentRequest: (state) => {
        state.loading = true
    },
    deleteComentSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    deleteCommentFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    newPostRequest: (state) => {
        state.loading = true
    },
    newPostSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    newPostFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    newStoryRequest: (state) => {
        state.loading = true
    },
    newStorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    newStoryFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },



    updateCaptionRequest: (state) => {
        state.loading = true
    },
    updateCaptionSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    updateCaptionFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    followUserRequest: (state) => {
        state.loading = true
    },
    followUserSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    followUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    
     savedPostRequest :(state)=>{
        state.loading = true;
      },
      savedPostSuccess :(state,action)=>{
          state.loading = false;
          state.message = action.payload;
           
      },
      savedPostFailure :(state,action)=>{
          state.loading = false;
          state.error  = action.payload;
      },


    acceptUserRequest: (state) => {
        state.loading = true
    },
    acceptUserSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    acceptUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    rejectUserRequest: (state) => {
        state.loading = true
    },
    rejectUserSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    rejectUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    deletePostRequest: (state) => {
        state.loading = true
    },
    deletePostSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    deletePostFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    deleteStoryRequest: (state) => {
        state.loading = true
    },
    deleteStorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    deleteStoryFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },




    updateProfileRequest: (state) => {
        state.loading = true
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    updateProfileFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    updatePasswordRequest: (state) => {
        state.loading = true
    },
    updatePasswordSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    updatePasswordFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    deleteProfileRequest: (state) => {
        state.loading = true
    },
    deleteProfileSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    deleteProfileFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    forgotPasswordRequest: (state) => {
        state.loading = true
    },
    forgotPasswordSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    forgotPasswordFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    resetPasswordRequest: (state) => {
        state.loading = true
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    resetPasswordFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },




    clearErrors: (state) => {
        state.error = null
    },
    clearMessage: (state) => {
        state.message = null
    }

})


//======================== My Post Reducer ============================

export const myPostsReducer = createReducer(initialState, {
    myPostsRequest: (state) => {
        state.loading = true;
    },
    myPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    myPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    mySavedPostsRequest: (state) => {
        state.loading = true;
    },
    mySavedPostsSuccess: (state, action) => {
        state.loading = false;
        state.savedPost = action.payload;
    },
    mySavedPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },






    clearErrors: (state) => {
        state.error = null;
    },
});

//=================== My Story ================================================
export const myStoryReducer = createReducer(initialState, {
    myStoryRequest: (state) => {
        state.loading = true;
    },
    myStorySuccess: (state, action) => {
        state.loading = false;
        state.story = action.payload;
    },
    myStoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    storyViewedRequest: (state) => {
        state.loading = true;
    },
    storyViewedSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    storyViewedFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    clearErrors: (state) => {
        state.error = null;
    },
});


//===================================== User Post Reduser ========================



export const userPostReducer = createReducer(initialState, {
    userPostRequest: (state) => {
        state.loading = true;
    },
    userPostSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    userPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});
