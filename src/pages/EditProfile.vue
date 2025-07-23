<template>
  <div class="bg-gray-50 min-h-screen py-10 px-4">
    <div
      class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow border border-gray-200"
    >
      <h1 class="text-2xl font-bold mb-6 text-gray-900">
        Редактирование профиля
      </h1>

      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Фамилия</label>
          <input
            v-model="form.surname"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1">Имя</label>
          <input
            v-model="form.first_name"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1">Отчество</label>
          <input
            v-model="form.last_name"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1">Телефон</label>
          <input
            v-model="form.phone_number"
            type="tel"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1">Новый пароль</label>
          <input
            v-model="form.new_password"
            type="password"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div v-if="form.new_password">
          <label class="block text-sm text-gray-600 mb-1"
            >Подтверждение пароля</label
          >
          <input
            v-model="form.confirm_password"
            type="password"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div v-if="form.new_password">
          <label class="block text-sm text-gray-600 mb-1">Старый пароль</label>
          <input
            v-model="form.old_password"
            type="password"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <p v-if="errorMessage" class="text-red-600 text-sm">
          {{ errorMessage }}
        </p>
        <p v-if="success" class="text-green-600 text-sm">
          Профиль успешно обновлён
        </p>

        <div class="flex justify-end mt-6 space-x-4">
          <RouterLink
            to="/account"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          >
            Отмена
          </RouterLink>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";
import api from "../api";

const router = useRouter();
const auth = useAuthStore();

const form = ref({
  surname: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  old_password: "",
  new_password: "",
  confirm_password: "",
});

const initialData = ref({});
const errorMessage = ref("");
const success = ref(false);

onMounted(async () => {
  try {
    const res = await api.post("/user/get-data", { token: auth.token });
    Object.assign(form.value, res.data);
    Object.assign(initialData.value, res.data);
  } catch (err) {
    errorMessage.value = "Ошибка загрузки данных";
  }
});

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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errorMessage.value = "Введите корректный email";
    return false;
  }
  if (!form.value.phone_number.trim()) {
    errorMessage.value = "Телефон обязателен";
    return false;
  }

  if (
    form.value.new_password ||
    form.value.old_password ||
    form.value.confirm_password
  ) {
    if (!form.value.old_password) {
      errorMessage.value = "Введите старый пароль";
      return false;
    }
    if (!form.value.new_password || form.value.new_password.length < 8) {
      errorMessage.value = "Новый пароль должен быть не менее 8 символов";
      return false;
    }
    if (form.value.new_password !== form.value.confirm_password) {
      errorMessage.value = "Пароли не совпадают";
      return false;
    }
  }

  errorMessage.value = "";
  return true;
}

const updateProfile = async () => {
  if (!validate()) return;

  try {
    const token = auth.token;

    if (form.value.email !== initialData.value.email) {
      await api.post("/user/change-email", { email: form.value.email, token });
    }

    if (form.value.phone_number !== initialData.value.phone_number) {
      await api.post("/user/change-phone", {
        phone_number: form.value.phone_number,
        token,
      });
    }

    if (form.value.new_password && form.value.old_password) {
      await api.post("/user/change-password", {
        old_password: form.value.old_password,
        new_password: form.value.new_password,
        token,
      });
    }

    success.value = true;
    setTimeout(() => router.push("/account"), 1500);
  } catch (err) {
    errorMessage.value = err.response?.data?.error || "Ошибка обновления";
  }
};
</script>
