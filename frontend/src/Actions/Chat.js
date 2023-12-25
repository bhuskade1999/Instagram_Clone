// import axios from 'axios'

//  const API = axios.create({ baseURL: 'http://localhost:4000' });

// export const createChat = (data) => API.post('/api/chat/', data);

// export const userChats = (id) => API.get(`/api/chat/${id}`);

// export const findChat = (firstId, secondId) => API.get(`/api/chat/find/${firstId}/${secondId}`);

import axios from "axios";

export const createChat = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "createChatRequest",
    });

    const { Data } = await axios.post("/api/chat/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "createChatSuccess",
      payload: Data,
    });
  } catch (error) {
    dispatch({
      type: "createChatFailure",
      payload: error.response.data.message,
    });
  }
};

export const userChats = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "UserChatRequest",
    });

    const { data } = await axios.get(`/api/chat/${id}`);

    dispatch({
      type: "UserChatSuccess",
      payload: data.chat,
    });
  } catch (error) {
    dispatch({
      type: "UserChatFailure",
      payload: error.response.data.message,
    });
  }
};

export const findChat = (firstId, secondId) => async (dispatch) => {
  try {
    dispatch({
      type: "FindChatRequest",
    });

    const { data } = await axios.get(`/api/chat/find/${firstId}/${secondId}`);
    dispatch({
      type: "FindChatSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FindChatFailure",
      payload: error.response.data.message,
    });
  }
};
