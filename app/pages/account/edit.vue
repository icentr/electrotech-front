<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold text-gray-800 mb-8">Редактирование профиля</h1>

    <div v-if="user.email" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ChangeEmail :currentEmail="user.email" />
      <ChangePhone :currentPhone="user.phone_number" />
      <ChangePassword />
    </div>
    <div v-else>Загрузка данных...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ChangeEmail from '@/pages/account/change-email.vue';
import ChangePhone from '@/pages/account/change-phone.vue';
import ChangePassword from '@/pages/account/change-password.vue';
import { getApi } from "@/api";

const api = getApi();


const user = ref({});

onMounted(async () => {
  try {
    const res = await api.post('/user/get-data');
    user.value = res.data;
  } catch (err) {
    console.error('Ошибка загрузки данных пользователя', err);
  }
});
useHead({
  title:"Редактирование профиля"
})
</script>
