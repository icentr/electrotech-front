<template>
  <div class="mx-auto mt-10 h-fit max-w-md rounded-lg bg-white p-6 shadow">
    <h2 class="mb-4 text-xl font-semibold">Изменить Email</h2>

    <form @submit.prevent="submitEmail">
      <div class="mb-4">
        <label class="mb-1 block text-sm font-medium text-gray-700"
          >Новый Email</label
        >
        <input
          v-model="email"
          type="email"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="example@mail.com"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        :disabled="loading || !email"
      >
        {{ loading ? "Сохранение..." : "Сохранить" }}
      </button>

      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
      <p v-if="success" class="mt-2 text-sm text-green-600">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "@/api";

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
