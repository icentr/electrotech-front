<!-- src/views/ResetPassword.vue -->
<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-gray-100">
            <div class="text-center">
                <div class="flex justify-center">
                    <div class="bg-blue-600 p-3 rounded-lg shadow-sm">
                        <LockClosedIcon class="size-6 text-white" />
                    </div>
                </div>
                <h2 class="mt-6 text-3xl font-bold text-gray-900">Сброс пароля</h2>
                <p class="mt-2 text-sm text-gray-600">Введите новый пароль для вашего аккаунта</p>
            </div>

            <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
                <p class="text-green-800 text-sm">{{ successMessage }}</p>
                <div class="mt-4 text-center">
                    <RouterLink to="/login" class="text-blue-600 hover:text-blue-500 font-medium">
                        Перейти к входу
                    </RouterLink>
                </div>
            </div>

            <form v-else class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
                <p v-if="errorMessage" class="text-red-500 text-sm text-center">
                    {{ errorMessage }}
                </p>

                <div class="space-y-4">
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Новый пароль</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon class="size-5 text-gray-400" />
                            </div>
                            <input id="password" v-model="form.password" name="password" type="password"
                                autocomplete="new-password" required
                                class="block w-full px-4 ps-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••" />
                        </div>
                    </div>

                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Подтвердите
                            пароль</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon class="size-5 text-gray-400" />
                            </div>
                            <input id="confirmPassword" v-model="form.confirmPassword" name="confirmPassword"
                                type="password" autocomplete="new-password" required
                                class="block w-full px-4 ps-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••" />
                        </div>
                    </div>
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="loading">Сброс пароля...</span>
                    <span v-else>Сбросить пароль</span>
                </button>
            </form>

            <div v-if="!successMessage" class="text-center">
                <RouterLink to="/login" class="text-blue-600 hover:text-blue-500 text-sm">
                    ← Вернуться к входу
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getApi } from "@/api";
import { LockClosedIcon } from "@heroicons/vue/16/solid";

const api = getApi();
const router = useRouter();
const route = useRoute();

const token = ref("");
const form = ref({
    password: "",
    confirmPassword: "",
});
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

onMounted(() => {
    token.value = route.query.token;
    if (!token.value) {
        errorMessage.value = "Неверная или отсутствующая ссылка для сброса пароля";
    }
});

function validate() {
    if (!form.value.password) {
        errorMessage.value = "Пароль обязателен";
        return false;
    }

    if (form.value.password.length < 8) {
        errorMessage.value = "Пароль должен быть не менее 8 символов";
        return false;
    }

    if (form.value.password !== form.value.confirmPassword) {
        errorMessage.value = "Пароли не совпадают";
        return false;
    }

    errorMessage.value = "";
    return true;
}

const handleResetPassword = async () => {
    if (!validate()) return;
    if (!token.value) {
        errorMessage.value = "Неверная ссылка для сброса пароля";
        return;
    }

    loading.value = true;
    errorMessage.value = "";

    try {
        await api.post("/auth/reset-password", {
            token: token.value,
            password: form.value.password,
        });

        successMessage.value = "Пароль успешно изменен! Теперь вы можете войти с новым паролем.";
    } catch (error) {
        console.error(error);
        if (error.response?.status === 400) {
            errorMessage.value = "Неверный или просроченный токен";
        } else {
            errorMessage.value = error.response?.data?.message || "Произошла ошибка при сбросе пароля";
        }
    } finally {
        loading.value = false;
    }
};

useHead({
    title: "Сброс пароля",
});
</script>