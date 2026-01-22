import axios, {
  Axios,
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/auth";

import { getApiBaseUrl } from "@/utils";

export const getApi = () => createApi(getApiBaseUrl());
import { useAxios } from "@vueuse/integrations/useAxios";

interface RetryConfig extends AxiosRequestConfig {
  _is_retry_request?: boolean;
}

const STATUS_UNAUTHORIZED = 401;

const refreshAuthentication = async (
  apiClient: Axios,
  refreshToken: string,
): Promise<{ token: string; refreshToken: string }> => {
  const { data } = await apiClient.post("auth/refresh", {
    refresh_token: refreshToken,
  });

  return { token: data.token, refreshToken: data.refresh_token };
};

export const createApi = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });

  // Перехватчики
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (error.response?.status !== STATUS_UNAUTHORIZED) {
        return error;
      }
      const auth = useAuthStore();

      switch (auth.status) {
        case "authenticated":
          console.error(
            "Something wrong with authentication, clearing auth data",
          );
          auth.clear();
          return Promise.reject(error);
        case "unauthenticated":
          const router = useRouter();
          router.push("/login");
          return Promise.reject(error);
        case "expired":
          try {
            const { token, refreshToken } = await refreshAuthentication(
              api,
              auth.refreshToken,
            );
            auth.login(token, refreshToken);
            return api.request(error.request);
          } catch (refreshErr) {
            return refreshErr;
          }
      }
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
