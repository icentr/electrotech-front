<template>
  <div class="flex h-fit flex-col rounded-xl bg-white p-6 shadow">
    <h2 class="title-2">Изменить Email</h2>

    <form @submit.stop.prevent="submitEmail">
      <div class="mb-4">
        <label class="mb-1 block text-sm font-medium text-gray-700"
          >Новый Email</label
        >
        <input
          v-model="email"
          type="email"
          class="entry"
          placeholder="example@mail.com"
          autocomplete="email"
          required
        />
      </div>

      <button
        type="submit"
        class="btn btn-accent"
        :disabled="loading || !email"
      >
        {{ loading ? "Сохранение..." : "Сохранить" }}
      </button>

      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
      <p v-if="success" class="mt-2 text-sm text-green-600">{{ success }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "@/api";
import type { AxiosError } from "axios";

const email = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");
const router = useRouter();

const api = getApi();

type ChangeEmailErrorResponse = { error: string };
type ChangeEmailSuccessResponse = { message: string };

type ChangeEmailResponse =
  | ChangeEmailSuccessResponse
  | ChangeEmailErrorResponse;

const submitEmail = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    await api.post<ChangeEmailResponse>("/user/change-email", {
      email: email.value,
    });
    success.value = "Email успешно обновлён";
    setTimeout(() => router.push("/account"), 1500);
  } catch (e) {
    error.value =
      ((e as AxiosError).response?.data as ChangeEmailErrorResponse)?.error ||
      "Ошибка при обновлении email";
  } finally {
    loading.value = false;
  }
};
</script>
