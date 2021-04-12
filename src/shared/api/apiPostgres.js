import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
    },

})

// export const getOtherIds = (id) => api.get(`/ids/${id}`);
//
// export const getAllUsers = () => api.get(`/users`);
// export const getUsersById = (id) => api.get(`/users/${id}`);
//
// export const createUser = (data) => api.post(`/users`, data);



export const getUserAccounts= (id) => api.get(`/account/getUserAccounts/${id}`);

export const getAccountTransactions= (acc_number) => api.get(`/transaction/getAccountTransactions/${acc_number}`);





const apis = {
    getUserAccounts,
    getAccountTransactions
}

export default apis;