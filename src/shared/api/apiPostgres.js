import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5432/api',
    headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
    },

})

export const getOtherIds = (id) => api.get(`/ids/${id}`);

export const getAllUsers = () => api.get(`/users`);
export const getUsersById = (id) => api.get(`/users/${id}`);

export const createUser = (data) => api.post(`/users`, data);

export const getWorkHistory = (id) => api.get(`/work_history/${id}`);
export const getAllWorkHistory = () => api.get(`/work_history`);




const apis = {
    getAllUsers,
    getUsersById,
    createUser,
    getWorkHistory,
    getOtherIds,
    getAllWorkHistory
}

export default apis;