// api.js
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/auth";

import { getApiBaseUrl } from "@/utils";

export const getApi = () => createApi(getApiBaseUrl());
import { useAxios } from "@vueuse/integrations/useAxios";

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const UNAUTHORIZED = 401;

export const createApi = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Перехватчики
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const auth = useAuthStore();
      const originalRequest = error.request as RetryConfig;

      if (error.response?.status === UNAUTHORIZED && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          if (!auth.refreshToken) throw new Error("No refresh token");

          const { data } = await axios.post(`${baseURL}auth/refresh`, {
            refresh_token: auth.refreshToken,
          });

          auth.token = data.token;
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = data.token;
          } else {
            originalRequest.headers = {
              Authorization: data.token,
            };
          }
          return api.request(originalRequest);
        } catch (refreshErr) {
          auth.logout();
          window.location.href = "/login";
          return Promise.reject(refreshErr);
        }
      }

      return Promise.reject(error);
    },
  );

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const auth = useAuthStore();
    if (auth.token) {
      config.headers["Authorization"] = auth.token;
    }
    return config;
  });

  return api;
};

export const useApi = (
  url: string,
  config: AxiosRequestConfig | null = null,
  options: {} | null = null,
) => {
  return useAxios(url, config ?? {}, getApi(), options ?? {});
};
