<!-- src/views/Register.vue -->
<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
  >
    <div
      class="w-full max-w-md space-y-8 rounded-xl border border-gray-100 bg-white p-10 shadow-sm"
    >
      <div class="text-center">
        <div class="flex justify-center">
          <div class="bg-accent rounded-lg p-3 shadow-sm">
            <BoltIcon class="size-6 text-2xl text-white" />
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Регистрация</h2>
        <p class="mt-2 text-sm text-gray-600">Создайте новую учетную запись</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <p v-if="errorMessage" class="text-center text-sm text-red-500">
          {{ errorMessage }}
        </p>

        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700"
              >Фамилия</label
            >
            <input v-model="form.surname" type="text" required class="entry" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700"
              >Имя</label
            >
            <input
              v-model="form.first_name"
              type="text"
              required
              class="entry"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700"
              >Отчество</label
            >
            <input v-model="form.last_name" type="text" class="entry" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input v-model="form.email" type="email" required class="entry" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700"
              >Телефон</label
            >
            <input
              v-model="form.phone_number"
              type="tel"
              required
              class="entry"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700"
              >Пароль</label
            >
            <input
              v-model="form.password"
              type="password"
              required
              class="entry"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700"
              >Подтвердите пароль</label
            >
            <input
              v-model="form.confirmPassword"
              type="password"
              required
              class="entry"
            />
          </div>
        </div>

        <button type="submit" class="btn btn-accent">Зарегистрироваться</button>
      </form>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Уже есть аккаунт?
          <RouterLink to="/login" class="text-accent hover:text-accent/80">
            Войти
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "@/api";
import { BoltIcon } from "@heroicons/vue/16/solid";

const api = getApi();

const router = useRouter();

const form = ref({
  surname: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  confirmPassword: "",
});

const errorMessage = ref("");

function validate() {
  if (!form.value.surname.trim()) {
    errorMessage.value = "Фамилия обязательна";
    return false;
  }
  if (!form.value.first_name.trim()) {
    errorMessage.value = "Имя обязательно";
    return false;
  }
  if (!form.value.email) {
    errorMessage.value = "Email обязателен";
    return false;
  }
  if (!form.value.email.includes("@")) {
    errorMessage.value = "Введите корректный email";
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errorMessage.value = "Введите корректный email";
    return false;
  }
  if (!form.value.phone_number.trim()) {
    errorMessage.value = "Телефон обязателен";
    return false;
  }
  if (!form.value.password) {
    errorMessage.value = "Пароль обязателен";
    return false;
  }
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = "Пароли не совпадают";
    return false;
  }
  if (form.value.password.length < 8) {
    errorMessage.value = "Пароль должен быть не менее 8 символов";
    return false;
  }
  errorMessage.value = "";
  return true;
}

const handleRegister = async () => {
  if (!validate()) return;

  try {
    await api.post("/auth/register", {
      email: form.value.email,
      password: form.value.password,
      first_name: form.value.first_name,
      surname: form.value.surname,
      last_name: form.value.last_name,
      phone_number: form.value.phone_number,
    });

    router.push("/login");
  } catch (error) {
    // ловим ответ от сервера
    if (error.response?.status === 409) {
      // например, 409 — конфликт (email или телефон занят)
      errorMessage.value =
        error.response.data?.message || "Email или телефон уже используется";
    } else {
      errorMessage.value =
        error.response?.data?.message || "Ошибка регистрации";
    }
  }
};
useHead({
  title: "Регистрация",
});
</script>
