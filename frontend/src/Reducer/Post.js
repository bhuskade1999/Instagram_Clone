import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("likeRequest", (state) => {
      state.loading = true;
    })
    .addCase("likeSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("likeFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("addCommentRequest", (state) => {
      state.loading = true;
    })
    .addCase("addComentSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("addCommentFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("deleteCommentRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteComentSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteCommentFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("newPostRequest", (state) => {
      state.loading = true;
    })
    .addCase("newPostSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("newPostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("newStoryRequest", (state) => {
      state.loading = true;
    })
    .addCase("newStorySuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("newStoryFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("updateCaptionRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateCaptionSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateCaptionFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("followUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("followUserSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("followUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("savedPostRequest", (state) => {
      state.loading = true;
    })
    .addCase("savedPostSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("savedPostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("acceptUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("acceptUserSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("acceptUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("rejectUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("rejectUserSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("rejectUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("deletePostRequest", (state) => {
      state.loading = true;
    })
    .addCase("deletePostSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deletePostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("deleteStoryRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteStorySuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteStoryFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("updateProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateProfileFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("updatePasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("updatePasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updatePasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("deleteProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteProfileFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("forgotPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("forgotPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("forgotPasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("resetPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("resetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("resetPasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    });
});

export const myPostsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("myPostsRequest", (state) => {
      state.loading = true;
    })
    .addCase("myPostsSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("myPostsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("mySavedPostsRequest", (state) => {
      state.loading = true;
    })
    .addCase("mySavedPostsSuccess", (state, action) => {
      state.loading = false;
      state.savedPost = action.payload;
    })
    .addCase("mySavedPostsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder.addCase("clearErrors", (state) => {
    state.error = null;
  });
});

export const myStoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("myStoryRequest", (state) => {
      state.loading = true;
    })
    .addCase("myStorySuccess", (state, action) => {
      state.loading = false;
      state.story = action.payload;
    })
    .addCase("myStoryFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("storyViewedRequest", (state) => {
      state.loading = true;
    })
    .addCase("storyViewedSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("storyViewedFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder.addCase("clearErrors", (state) => {
    state.error = null;
  });
});

export const userPostReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("userPostRequest", (state) => {
      state.loading = true;
    })
    .addCase("userPostSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("userPostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("hashTagPostRequest", (state) => {
      state.loading = true;
    })
    .addCase("hashTagPostSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("hashTagPostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder.addCase("clearErrors", (state) => {
    state.error = null;
  });
});

export const hashTagPostReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("hashTagRequest", (state) => {
      state.loading = true;
    })
    .addCase("hashTagSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("hashTagFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder.addCase("clearErrors", (state) => {
    state.error = null;
  });
});
