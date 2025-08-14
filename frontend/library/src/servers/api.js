import Axios from "axios";

const api = Axios.create({
    baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((req) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default api;