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

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
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

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <!-- <input id="remember-me" v-model="form.remember" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-700"> Запомнить меня </label> -->
          </div>

          <div class="text-sm">
            <RouterLink
              to="/ForgotPassword"
              class="hover:text-accent/80 text-accent font-medium"
            >
              Забыли пароль?
            </RouterLink>
          </div>
        </div>

        <div>
          <button type="submit" class="group btn btn-accent">
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
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "@/api";
import {
  ArrowRightEndOnRectangleIcon,
  BoltIcon,
} from "@heroicons/vue/16/solid";

const api = getApi();

const router = useRouter();

const form = ref({
  email: "",
  password: "",
  remember: false,
});

const errorMessage = ref("");

function validate() {
  if (!form.value.email) {
    errorMessage.value = "Email обязателен";
    return false;
  }
  // Простая проверка email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errorMessage.value = "Введите корректный email";
    return false;
  }
  if (!form.value.password) {
    errorMessage.value = "Пароль обязателен";
    return false;
  }
  errorMessage.value = "";
  return true;
}

const handleLogin = async () => {
  if (!validate()) return;

  try {
    const response = await api.post("/auth/login", {
      email: form.value.email,
      password: form.value.password,
    });

    const { token, refresh_token } = response.data;

    const authStore = useAuthStore();
    authStore.login(token, refresh_token);

    router.push("/account");
  } catch (error) {
    console.error(error);
    errorMessage.value =
      error.response?.data?.message || "Неверный email или пароль";
  }
};
usePageTitle("Авторизация");
</script>
