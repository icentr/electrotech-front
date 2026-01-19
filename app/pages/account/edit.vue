<template>
  <BreadcrumbsBlock
    :breadcrumbs="[{ name: 'Личный кабинет', url: '/account' }]"
    page="Редактирование профиля"
  />
  <div>
    <h1 class="mb-8 text-3xl font-semibold text-gray-800">
      Редактирование профиля
    </h1>

    <div
      v-if="user.email"
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <ChangeEmail :currentEmail="user.email" />
      <ChangePhone :currentPhone="user.phone_number" />
      <ChangePassword />
    </div>
    <div v-else>Загрузка данных...</div>
  </div>
</template>

<script setup lang="ts">
import { getApi } from "@/api";

const api = getApi();

const user = ref<{ email: string; phone_number: string }>({
  email: "",
  phone_number: "",
});

onMounted(async () => {
  try {
    const res = await api.post("/user/get-data");
    user.value = res.data;
  } catch (err) {
    console.error("Ошибка загрузки данных пользователя", err);
  }
});
usePageTitle("Редактирование профиля");
</script>
