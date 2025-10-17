<!-- src/views/Register.vue -->
<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-gray-100">
            <div class="text-center">
                <div class="flex justify-center">
                    <div class="bg-blue-600 p-3 rounded-lg shadow-sm">
                        <BoltIcon class="text-white text-2xl size-6" />
                    </div>
                </div>
                <h2 class="mt-6 text-3xl font-bold text-gray-900">Регистрация</h2>
                <p class="mt-2 text-sm text-gray-600">Создайте новую учетную запись</p>
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
                <p v-if="errorMessage" class="text-red-500 text-sm text-center">
                    {{ errorMessage }}
                </p>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                        <input v-model="form.surname" type="text" required class="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                        <input v-model="form.first_name" type="text" required class="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Отчество</label>
                        <input v-model="form.last_name" type="text" class="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="form.email" type="email" required class="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                        <input
                            v-model="form.phone_number"
                            type="tel"
                            required
                            class="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                        <input
                            v-model="form.password"
                            type="password"
                            required
                            class="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Подтвердите пароль</label>
                        <input
                            v-model="form.confirmPassword"
                            type="password"
                            required
                            class="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>

                <button
                    type="submit"
                    class="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                    Зарегистрироваться
                </button>
            </form>

            <div class="text-center">
                <p class="text-sm text-gray-600">
                    Уже есть аккаунт?
                    <RouterLink to="/login" class="text-blue-600 hover:text-blue-500"> Войти </RouterLink>
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
            errorMessage.value = error.response.data?.message || "Email или телефон уже используется";
        } else {
            errorMessage.value = error.response?.data?.message || "Ошибка регистрации";
        }
    }
};
useHead({
    title: "Регистрация",
});
</script>
