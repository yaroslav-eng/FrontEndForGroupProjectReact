import axios from "axios";

// const API_URL = "http://localhost:5432/api/auth/";
const API_URL = "http://localhost:8080/user";

const register = (username, email, password) => {
    return axios.post(API_URL + "/create", {
        username,
        email,
        password
    });
};

const login = (username, password) => {
    console.log("check1 in CLIEENT: auth.service")
    return axios
        .post(API_URL + "/signin", {
            username,
            password,
        })
        .then((response) => {
            console.log("check 2 in CLIEENT: auth.service")
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            console.log(response.data, "check 2 A in CLIEENT: auth.service")
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    console.log("check 3 in CLIEENT: auth.service")
    return JSON.parse(localStorage.getItem("user"));
};

const apisAuth = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default apisAuth;