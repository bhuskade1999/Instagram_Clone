import axios from 'axios'


export const addMessage = (message) => async (dispatch) => {
    try {
      dispatch({
        type: "addMsgRequest"
      })
  
      const { data } = await axios.post("/api/message/", message, {
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      dispatch({
        type: "addMsgSuccess",
        payload: data.msg
      })
  
  
    } catch (error) {
  
      dispatch({
        type: "addMsgFailure ",
        payload: error.response.data.message
      })
    }
  
  }
  
  
    export const  getMessages = (id) => async (dispatch) => {
      try {
        dispatch({
          type: "getMsgRequest",
        });
    
        const { data } = await axios.get(`/api/message/${id}`);
        dispatch({
          type: "getMsgSuccess",
          payload: data.msg,
        });
      } catch (error) {
        dispatch({
          type: "getMsgFailure",
          payload: error.response.data.message,
        });
      }
    };
    
  


// const API = axios.create({ baseURL: 'http://localhost:4000' });

// export const getMessages = (id) => API.get(`/api/message/${id}`);

// export const addMessage = (data) => API.post('/api/message/', data);