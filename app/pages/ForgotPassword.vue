<!-- src/views/ForgotPassword.vue -->
<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
  >
    <div
      class="w-full max-w-md space-y-8 rounded-xl border border-gray-100 bg-white p-10 shadow-sm"
    >
      <div class="text-center">
        <div class="flex justify-center">
          <div class="rounded-lg bg-blue-600 p-3 shadow-sm">
            <KeyIcon class="size-6 text-white" />
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Восстановление пароля
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Введите email для восстановления пароля
        </p>
      </div>

      <div
        v-if="successMessage"
        class="rounded-lg border border-green-200 bg-green-50 p-4"
      >
        <p class="text-sm text-green-800">{{ successMessage }}</p>
      </div>

      <form
        v-else
        class="mt-8 space-y-6"
        @submit.prevent="handleForgotPassword"
      >
        <p v-if="errorMessage" class="text-center text-sm text-red-500">
          {{ errorMessage }}
        </p>

        <div>
          <label
            for="email"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Email</label
          >
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <EnvelopeIcon class="size-5 text-gray-400" />
            </div>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 ps-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span v-if="loading">Отправка...</span>
          <span v-else>Отправить ссылку для восстановления</span>
        </button>
      </form>

      <div class="text-center">
        <RouterLink
          to="/login"
          class="text-sm text-blue-600 hover:text-blue-500"
        >
          ← Вернуться к входу
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "@/api";
import { EnvelopeIcon, KeyIcon } from "@heroicons/vue/16/solid";

const api = getApi();
const router = useRouter();

const email = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

function validate() {
  if (!email.value) {
    errorMessage.value = "Email обязателен";
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errorMessage.value = "Введите корректный email";
    return false;
  }

  errorMessage.value = "";
  return true;
}

const handleForgotPassword = async () => {
  if (!validate()) return;

  loading.value = true;
  errorMessage.value = "";

  try {
    await api.post("/auth/forgot-password", {
      email: email.value,
    });

    successMessage.value =
      "Ссылка для восстановления пароля отправлена на ваш email. Проверьте почту.";
  } catch (error) {
    console.error(error);
    if (error.response?.status === 404) {
      errorMessage.value = "Пользователь с таким email не найден";
    } else {
      errorMessage.value =
        error.response?.data?.message || "Произошла ошибка при отправке email";
    }
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Восстановление пароля",
});
</script>
