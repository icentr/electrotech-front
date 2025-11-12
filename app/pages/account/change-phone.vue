<template>
  <div
    class="mx-auto mt-10 h-fit max-w-md space-y-6 rounded-xl bg-white p-6 shadow"
  >
    <h2 class="text-xl font-semibold text-gray-800">Изменить номер телефона</h2>

    <form @submit.prevent="submitPhone">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Новый номер телефона</label
          >
          <input
            v-model="phone"
            type="tel"
            placeholder="+7..."
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            :disabled="loading"
          >
            Сохранить
          </button>
        </div>

        <div v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</div>
        <div v-if="success" class="mt-2 text-sm text-green-600">
          Номер успешно обновлён
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "@/api";

const api = getApi();

const phone = ref("");
const loading = ref(false);
const error = ref("");
const success = ref(false);

const router = useRouter();

const submitPhone = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    await api.post("/user/change-phone", {
      phone_number: phone.value,
    });
    success.value = true;
    setTimeout(() => router.push("/account"), 1500);
  } catch (err) {
    error.value = err.response?.data?.error || "Ошибка при обновлении номера";
  } finally {
    loading.value = false;
  }
};
</script>
