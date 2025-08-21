import Axios from "axios";

const API = Axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;