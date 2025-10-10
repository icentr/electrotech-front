import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore(
    "auth",
    () => {
        // Состояние токена
        const token = ref("");
        const refreshToken = ref("");

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

        /**
         * Вход — сохраняем токен и обновляем состояние
         * @param {String} newToken
         * @param {String} newRefreshToken
         */
        function login(newToken, newRefreshToken) {
            token.value = newToken;
            refreshToken.value = newRefreshToken;
        }

        // Выход — очищаем токен и состояние
        function logout() {
            token.value = null;
            refreshToken.value = null;
        }

        return { token, refreshToken, isAuthenticated, login, logout };
    },
    { persist: true }
);
