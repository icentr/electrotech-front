import { defineStore } from "pinia";
import { ref, computed } from "vue";

type AuthStatus = "expired" | "authenticated" | "unauthenticated";

type JWTPayload = {
  /** Expires at */
  exp: number;
  /** Issued at */
  iat: number;
  /** Issuer */
  iss: string;
};

const parseJWT = (token: string): { payload: JWTPayload } => {
  const [header_segment, payload_segment, signature_segment] = token.split(".");

  if (!payload_segment)
    throw new Error("Invalid token. The token must contain a payload segment.");

  const payload = JSON.parse(atob(payload_segment));
  return { payload };
};

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref("");
    const refreshToken = ref("");

    const status = computed(() => {
      if (!token.value) return "unauthenticated";
      try {
        const { payload } = parseJWT(token.value);
        return payload.exp * 1000 > Date.now() ? "authenticated" : "expired";
      } catch (e) {
        console.error("Invalid token", e);
        return "unauthenticated";
      }
    });

    /**
     * Вход — сохраняем токен и обновляем состояние
     * @param {String} newToken
     * @param {String} newRefreshToken
     */
    function login(newToken: string, newRefreshToken: string) {
      token.value = newToken;
      refreshToken.value = newRefreshToken;
    }

    /**
     * Выход — очищаем токен и состояние
     * @deprecated Use clear() instead.
     */
    function logout() {
      clear();
    }

    const clear = () => {
      token.value = "";
      refreshToken.value = "";
    };

    return {
      token,
      refreshToken,
      status,
      login,
      logout,
      clear,
    };
  },
  { persist: true },
);
