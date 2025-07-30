import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
    // Состояние токена
    const token = ref(import.meta.server ? null : window.localStorage.getItem("token"));

    // Проверка валидности токена (JWT)
    const isAuthenticated = computed(() => {
        if (!token.value) return false;
        try {
            const payload = JSON.parse(atob(token.value.split(".")[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            console.error("Invalid token");
            return false;
        }
    });

    // Вход — сохраняем токен и обновляем состояние
    function login(newToken) {
        token.value = newToken;
        if (import.meta.server) return;
        localStorage.setItem("token", newToken);
    }

    // Выход — очищаем токен и состояние
    function logout() {
        token.value = null;
        if (import.meta.server) return;
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
    }

    return { token, isAuthenticated, login, logout };
});
