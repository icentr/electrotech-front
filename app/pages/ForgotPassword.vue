<!-- src/views/ForgotPassword.vue -->
<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-gray-100">
            <div class="text-center">
                <div class="flex justify-center">
                    <div class="bg-blue-600 p-3 rounded-lg shadow-sm">
                        <KeyIcon class="size-6 text-white" />
                    </div>
                </div>
                <h2 class="mt-6 text-3xl font-bold text-gray-900">Восстановление пароля</h2>
                <p class="mt-2 text-sm text-gray-600">Введите email для восстановления пароля</p>
            </div>

            <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
                <p class="text-green-800 text-sm">{{ successMessage }}</p>
            </div>

            <form v-else class="mt-8 space-y-6" @submit.prevent="handleForgotPassword">
                <p v-if="errorMessage" class="text-red-500 text-sm text-center">
                    {{ errorMessage }}
                </p>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon class="size-5 text-gray-400" />
                        </div>
                        <input id="email" v-model="email" name="email" type="email" autocomplete="email" required
                            class="block w-full px-4 ps-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="your@email.com" />
                    </div>
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="loading">Отправка...</span>
                    <span v-else>Отправить ссылку для восстановления</span>
                </button>
            </form>

            <div class="text-center">
                <RouterLink to="/login" class="text-blue-600 hover:text-blue-500 text-sm">
                    ← Вернуться к входу
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "@/api";
import { EnvelopeIcon, KeyIcon } from "@heroicons/vue/16/solid";

const api = getApi();
const router = useRouter();

const email = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

function validate() {
    if (!email.value) {
        errorMessage.value = "Email обязателен";
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        errorMessage.value = "Введите корректный email";
        return false;
    }

    errorMessage.value = "";
    return true;
}

const handleForgotPassword = async () => {
    if (!validate()) return;

    loading.value = true;
    errorMessage.value = "";

    try {
        await api.post("/auth/forgot-password", {
            email: email.value,
        });

        successMessage.value = "Ссылка для восстановления пароля отправлена на ваш email. Проверьте почту.";
    } catch (error) {
        console.error(error);
        if (error.response?.status === 404) {
            errorMessage.value = "Пользователь с таким email не найден";
        } else {
            errorMessage.value = error.response?.data?.message || "Произошла ошибка при отправке email";
        }
    } finally {
        loading.value = false;
    }
};

useHead({
    title: "Восстановление пароля",
});
</script>