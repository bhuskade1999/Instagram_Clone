import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:4000' });

export const getUser = (userId) => API.get(`/api/chat/getuser/${userId}`);

export const createChat = (data) => API.post('/api/chat/', data);

export const userChats = (id) => API.get(`/api/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/api/chat/find/${firstId}/${secondId}`);

export const getMessages = (id) => API.get(`/api/message/${id}`);

export const addMessage = (data) => API.post('api/message/', data);

export const deleteMessage = (id) => API.delete(`api/message/delete/${id}`)