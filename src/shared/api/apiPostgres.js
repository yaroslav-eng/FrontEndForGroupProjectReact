import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080/user',
    headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
    },

})

export const getOtherIds = (id) => api.get(`/ids/${id}`);

export const getAllUsers = () => api.get(`/users`);
export const getUsersById = (id) => api.get(`/users/${id}`);

export const createUser = (data) => api.post(`/users`, data);



export const getUser= () => api.get(`/get`);





const apis = {
    getUser,
    getAllUsers,
    getUsersById,
    createUser,
    getOtherIds
}

export default apis;