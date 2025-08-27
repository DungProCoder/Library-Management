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

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refresh = localStorage.getItem("refresh_token");
                const res = await API.post("token/refresh/", {
                    refresh,
                });
                localStorage.setItem("access", res.data.access);
                API.defaults.headers.Authorization = `Bearer ${res.data.access}`;
                return API(originalRequest);
            } catch (err) {
                console.error("Refresh token cũng hết hạn → cần login lại");
            }
        }
        return Promise.reject(error);
    }
);

export default API;