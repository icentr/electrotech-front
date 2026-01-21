<template>
  <div class="flex h-fit flex-col rounded-xl bg-white p-6 shadow">
    <h2 class="title-2">Изменить номер телефона</h2>

    <form @submit.stop.prevent="submitPhone">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Новый номер телефона</label
          >
          <input
            v-model="phone"
            type="tel"
            placeholder="+7..."
            class="entry"
            required
          />
        </div>

        <div class="flex justify-end">
          <button type="submit" class="btn btn-accent" :disabled="loading">
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
