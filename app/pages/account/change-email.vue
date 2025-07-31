<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10 h-fit">
    <h2 class="text-xl font-semibold mb-4">Изменить Email</h2>

    <form @submit.prevent="submitEmail">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Новый Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="example@mail.com"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        :disabled="loading || !email"
      >
        {{ loading ? "Сохранение..." : "Сохранить" }}
      </button>

      <p v-if="error" class="text-red-600 mt-2 text-sm">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-2 text-sm">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api";

const email = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");
const router = useRouter();

const submitEmail = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    await api.post("/user/change-email", { email: email.value });
    success.value = "Email успешно обновлён";
    setTimeout(() => router.push("/account"), 1500);
  } catch (e) {
    error.value = e.response?.data?.error || "Ошибка при обновлении email";
  } finally {
    loading.value = false;
  }
};
</script>
