<!-- src/views/Login.vue -->
<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-gray-100">
      <div class="text-center">
        <div class="flex justify-center">
          <div class="bg-blue-600 p-3 rounded-lg shadow-sm">
            <i class="fas fa-bolt text-white text-2xl"></i>
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Вход в личный кабинет
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Введите ваши учетные данные для входа
        </p>
      </div>
      <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-400"></i>
              </div>
              <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required
                     class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="your@email.com">
            </div>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input id="password" v-model="form.password" name="password" type="password" autocomplete="current-password" required
                     class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="••••••••">
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" v-model="form.remember" name="remember-me" type="checkbox"
                   class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
              Запомнить меня
            </label>
          </div>

          <div class="text-sm">
            <RouterLink to="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
              Забыли пароль?
            </RouterLink>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i class="fas fa-sign-in-alt text-blue-300 group-hover:text-blue-200"></i>
            </span>
            Войти
          </button>
        </div>
      </form>
      
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Еще нет аккаунта?
          <RouterLink to="/Register" class="font-medium text-blue-600 hover:text-blue-500">
            Зарегистрироваться
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { useAuthStore } from '../stores/useAuthStore'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  email: '',
  password: '',
  remember: false
})

const errorMessage = ref('')

function validate() {
  if (!form.value.email) {
    errorMessage.value = 'Email обязателен'
    return false
  }
  // Простая проверка email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    errorMessage.value = 'Введите корректный email'
    return false
  }
  if (!form.value.password) {
    errorMessage.value = 'Пароль обязателен'
    return false
  }
  errorMessage.value = ''
  return true
}

const handleLogin = async () => {
  if (!validate()) return

  try {
    const response = await api.post('/auth/login', {
      email: form.value.email,
      password: form.value.password
    })

    const { token, refresh_token } = response.data

    auth.login(token)
    localStorage.setItem('refresh_token', refresh_token)

    router.push('/account')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Неверный email или пароль'
  }
}
</script>
