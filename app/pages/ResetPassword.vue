<!-- src/views/ResetPassword.vue -->
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
            <LockClosedIcon class="size-6 text-white" />
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Сброс пароля</h2>
        <p class="mt-2 text-sm text-gray-600">
          Введите новый пароль для вашего аккаунта
        </p>
      </div>

      <div
        v-if="successMessage"
        class="rounded-lg border border-green-200 bg-green-50 p-4"
      >
        <p class="text-sm text-green-800">{{ successMessage }}</p>
        <div class="mt-4 text-center">
          <RouterLink
            to="/login"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Перейти к входу
          </RouterLink>
        </div>
      </div>

      <form v-else class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <p v-if="errorMessage" class="text-center text-sm text-red-500">
          {{ errorMessage }}
        </p>

        <div class="space-y-4">
          <div>
            <label
              for="password"
              class="mb-1 block text-sm font-medium text-gray-700"
              >Новый пароль</label
            >
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <LockClosedIcon class="size-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 ps-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="mb-1 block text-sm font-medium text-gray-700"
              >Подтвердите пароль</label
            >
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <LockClosedIcon class="size-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                name="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 ps-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span v-if="loading">Сброс пароля...</span>
          <span v-else>Сбросить пароль</span>
        </button>
      </form>

      <div v-if="!successMessage" class="text-center">
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getApi } from "@/api";
import { LockClosedIcon } from "@heroicons/vue/16/solid";

const api = getApi();
const router = useRouter();
const route = useRoute();

const token = ref("");
const form = ref({
  password: "",
  confirmPassword: "",
});
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

onMounted(() => {
  token.value = route.query.token;
  if (!token.value) {
    errorMessage.value = "Неверная или отсутствующая ссылка для сброса пароля";
  }
});

function validate() {
  if (!form.value.password) {
    errorMessage.value = "Пароль обязателен";
    return false;
  }

  if (form.value.password.length < 8) {
    errorMessage.value = "Пароль должен быть не менее 8 символов";
    return false;
  }

  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = "Пароли не совпадают";
    return false;
  }

  errorMessage.value = "";
  return true;
}

const handleResetPassword = async () => {
  if (!validate()) return;
  if (!token.value) {
    errorMessage.value = "Неверная ссылка для сброса пароля";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    await api.post("/auth/reset-password", {
      token: token.value,
      password: form.value.password,
    });

    successMessage.value =
      "Пароль успешно изменен! Теперь вы можете войти с новым паролем.";
  } catch (error) {
    console.error(error);
    if (error.response?.status === 400) {
      errorMessage.value = "Неверный или просроченный токен";
    } else {
      errorMessage.value =
        error.response?.data?.message || "Произошла ошибка при сбросе пароля";
    }
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Сброс пароля",
});
</script>
