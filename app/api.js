// api.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

// НЕ определяем BASE_URL здесь!

let api; // будет инициализирован в плагине

export const createApi = (baseURL) => {
    api = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Перехватчики
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const auth = useAuthStore();
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    if (!auth.refreshToken) throw new Error("No refresh token");

                    const { data } = await axios.post(`${baseURL}auth/refresh`, {
                        refresh_token: auth.refreshToken,
                    });

                    auth.token = data.token;
                    originalRequest.headers["Authorization"] = data.token;
                    return api(originalRequest);
                } catch (refreshErr) {
                    auth.logout();
                    window.location.href = "/login";
                    return Promise.reject(refreshErr);
                }
            }

            return Promise.reject(error);
        }
    );

    api.interceptors.request.use((config) => {
        const auth = useAuthStore();
        if (auth.token) {
            config.headers["Authorization"] = auth.token;
        }
        return config;
    });
};

export const getApi = () => api;

export const getImageUrl = (filename) => {
    if (!filename) {
        console.warn("No filename provided");
        return "";
    }
    return `${api?.defaults.baseURL}files/${filename}`;
};
