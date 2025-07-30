import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const BASE_URL = "http://localhost:1488/api/";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

//  Перехватчик ответов — пытается обновить токен при 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const auth = useAuthStore();
        const originalRequest = error.config;

        // Пропускаем, если уже пробовали рефреш
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (!auth.refreshToken) throw new Error("No refresh token");

                const { data } = await axios.post("/auth/refresh", {
                    refresh_token: auth.refreshToken,
                });

                // Обновляем токен в хранилище и в localStorage
                auth.token = data.token;

                // Повторяем оригинальный запрос с новым токеном
                originalRequest.headers["Authorization"] = data.token;
                return api(originalRequest);
            } catch (refreshErr) {
                // Если refresh не сработал — выкидываем пользователя
                auth.logout();
                window.location.href = "/login";
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(error);
    }
);

// Перехватчик запроса — подставляет токен
api.interceptors.request.use((config) => {
    const auth = useAuthStore();
    if (auth.token) {
        config.headers["Authorization"] = auth.token;
    }
    return config;
});

const getImageUrl = (filename) => {
    if (!filename) {
        console.warn("No filename provided");
        return "";
    }
    return `${BASE_URL}files/` + filename;
};

export { BASE_URL, getImageUrl };

export default api;
