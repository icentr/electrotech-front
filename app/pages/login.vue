<!-- src/views/Login.vue -->
<template>
  <div
    class="flex items-start justify-center bg-gray-50 px-4 sm:px-6 md:items-center md:py-12 lg:px-8"
  >
    <div
      class="w-full max-w-md space-y-8 rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:p-10"
    >
      <div class="text-center">
        <div class="flex justify-center">
          <div class="bg-accent rounded-lg p-3 shadow-sm">
            <BoltIcon class="size-6 text-white" />
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Вход в личный кабинет
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Введите ваши учетные данные для входа
        </p>
      </div>
      <p v-if="errorMessage" class="text-center text-sm text-red-500">
        {{ errorMessage }}
      </p>

      <form class="mt-8 space-y-6">
        <div class="space-y-4 rounded-md">
          <div>
            <label
              for="email"
              class="mb-1 block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="entry pl-10"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              for="password"
              class="mb-1 block text-sm font-medium text-gray-700"
              >Пароль</label
            >
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="entry"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group btn btn-accent"
            @click="handleLogin"
          >
            Войти
            <ArrowRightEndOnRectangleIcon
              class="size-5 text-blue-300 group-hover:text-blue-200"
            />
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Еще нет аккаунта?
          <RouterLink
            to="/Register"
            class="text-accent hover:text-accent/80 font-medium"
          >
            Зарегистрироваться
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "@/api";
import {
  ArrowRightEndOnRectangleIcon,
  BoltIcon,
} from "@heroicons/vue/16/solid";
import { useUrlSearchParams } from "@vueuse/core";
import type { AxiosError } from "axios";

const api = getApi();

const router = useRouter();

type LoginData = {
  email?: string;
  password?: string;
};

const form = ref<LoginData>({});

// Safari specific code
const urlParams = useUrlSearchParams<LoginData>("history");

form.value = urlParams;

const errorMessage = ref("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValid = () => {
  let errors = [];

  if (!form.value.email) {
    errors.push("Email обязателен");
  }
  if (!emailRegex.test(form.value.email)) {
    errors.push("Введите корректный email");
  }
  if (!form.value.password) {
    errors.push("Пароль обязателен");
  }

  return { valid: errors.length === 0, errors: errors };
};

const validate = (): boolean => {
  const validationResult = isValid();
  errorMessage.value = validationResult.errors.join(", ");
  return validationResult.valid;
};

type SuccessResponse = {
  token: string;
  refresh_token: string;
};

type ErrorResponse = {
  error: string;
};

function isSuccess(
  response: SuccessResponse | ErrorResponse,
): response is SuccessResponse {
  return (
    (response as SuccessResponse).token !== undefined &&
    (response as SuccessResponse).refresh_token !== undefined
  );
}

const handleLogin = async () => {
  if (!validate()) return;

  try {
    const response = await api.post<SuccessResponse | ErrorResponse>(
      "/auth/login",
      {
        email: form.value.email,
        password: form.value.password,
      },
    );

    if (!isSuccess(response.data)) {
      errorMessage.value = response.data.error;
      return;
    }

    const { token, refresh_token } = response.data;

    const authStore = useAuthStore();
    authStore.login(token, refresh_token);

    router.push("/account");
  } catch (error) {
    console.error(error);
    errorMessage.value =
      "Неверный email или пароль " +
      `(${((error as AxiosError).response?.data as ErrorResponse)?.error || "Неизвестная ошибка"})`;
  }
};
if (isValid().valid) {
  handleLogin();
}
usePageTitle("Авторизация");
</script>
