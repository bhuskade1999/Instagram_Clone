import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("createChatRequest", (state) => {
      state.loading = true;
    })
    .addCase("createChatSuccess", (state, action) => {
      state.loading = false;
      state.chat = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("createChatFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

  builder
    .addCase("UserChatRequest", (state) => {
      state.loading = true;
    })
    .addCase("UserChatSuccess", (state, action) => {
      state.loading = false;
      state.chat = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("UserChatFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

  builder
    .addCase("FindChatRequest", (state) => {
      state.loading = true;
    })
    .addCase("FindChatSuccess", (state, action) => {
      state.loading = false;
      state.chat = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("FindChatFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
});

export const messageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getMsgRequest", (state) => {
      state.loading = true;
    })
    .addCase("getMsgSuccess", (state, action) => {
      state.loading = false;
      state.msg = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("getMsgFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

  builder
    .addCase("addMsgRequest", (state) => {
      state.loading = true;
    })
    .addCase("addMsgSuccess", (state, action) => {
      state.loading = false;
      state.msg = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("addMsgFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
});
