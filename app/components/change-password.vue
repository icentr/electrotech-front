<template>
  <div class="flex flex-col rounded-xl bg-white p-6 shadow">
    <h2 class="title-2">Сменить пароль</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700"
          >Текущий пароль</label
        >
        <input
          v-model="currentPassword"
          autocomplete="current-password"
          type="password"
          required
          class="entry"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700"
          >Новый пароль</label
        >
        <input
          v-model="newPassword"
          type="password"
          required
          class="entry"
          autocomplete="new-password"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700"
          >Повторите новый пароль</label
        >
        <input
          v-model="confirmPassword"
          type="password"
          required
          autocomplete="new-password"
          class="entry"
        />
      </div>

      <div v-if="error" class="text-sm text-red-600">{{ error }}</div>
      <div v-if="success" class="text-sm text-green-600">
        Пароль успешно изменён!
      </div>

      <button type="submit" class="btn btn-accent">Сменить пароль</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getApi } from "@/api";

const api = getApi();

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref(false);

const handleSubmit = async () => {
  error.value = "";
  success.value = false;

  if (newPassword.value !== confirmPassword.value) {
    error.value = "Новые пароли не совпадают";
    return;
  }

  try {
    await api.post("/user/change-password", {
      old_password: currentPassword.value,
      new_password: newPassword.value,
    });

    success.value = true;
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
  } catch (err) {
    error.value = err.response?.data?.message || "Ошибка при смене пароля";
  }
};
</script>
