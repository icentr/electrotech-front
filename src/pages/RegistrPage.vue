<!-- src/views/Register.vue -->
<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-gray-100">
      <div class="text-center">
        <div class="flex justify-center">
          <div class="bg-blue-600 p-3 rounded-lg shadow-sm">
            <i class="fas fa-bolt text-white text-2xl"></i>
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Регистрация компании
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Заполните форму для создания учетной записи вашей компании
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Личная информация -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b pb-2">Личная информация</h3>
            
            <div>
              <label for="full-name" class="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-user text-gray-400"></i>
                </div>
                <input id="full-name" v-model="form.fullName" type="text" required
                       class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="Иванов Иван Иванович">
              </div>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-envelope text-gray-400"></i>
                </div>
                <input id="email" v-model="form.email" type="email" autocomplete="email" required
                       class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="your@email.com">
              </div>
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-phone-alt text-gray-400"></i>
                </div>
                <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" required
                       class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="+7 (999) 123-45-67">
              </div>
            </div>
            
            <div>
              <label for="position" class="block text-sm font-medium text-gray-700 mb-1">Должность</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-briefcase text-gray-400"></i>
                </div>
                <input id="position" v-model="form.position" type="text" required
                       class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="Менеджер по закупкам">
              </div>
            </div>
          </div>
          
          <!-- Информация о компании -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b pb-2">Информация о компании</h3>
            
            <div>
              <label for="company-name" class="block text-sm font-medium text-gray-700 mb-1">Название компании</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-building text-gray-400"></i>
                </div>
                <input id="company-name" v-model="form.companyName" type="text" required
                       class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="ООО 'Компания'">
              </div>
            </div>
            
            <div>
              <label for="inn" class="block text-sm font-medium text-gray-700 mb-1">ИНН</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-file-invoice text-gray-400"></i>
                </div>
                <input id="inn" v-model="form.inn" type="text" required
                       class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="1234567890">
              </div>
            </div>
            
            <div>
              <label for="kpp" class="block text-sm font-medium text-gray-700 mb-1">КПП</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-file-invoice text-gray-400"></i>
                </div>
                <input id="kpp" v-model="form.kpp" type="text" required
                       class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="123456001">
              </div>
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-gray-400"></i>
                </div>
                <input id="password" v-model="form.password" type="password" autocomplete="new-password" required
                       class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="••••••••">
              </div>
            </div>
            
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Подтвердите пароль</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-gray-400"></i>
                </div>
                <input id="confirm-password" v-model="form.confirmPassword" type="password" autocomplete="new-password" required
                       class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="••••••••">
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="terms" v-model="form.agreeTerms" name="terms" type="checkbox" required
                   class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="terms" class="font-medium text-gray-700">
              Я согласен с <a href="#" class="text-blue-600 hover:text-blue-500">условиями использования</a> и <a href="#" class="text-blue-600 hover:text-blue-500">политикой конфиденциальности</a>
            </label>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i class="fas fa-user-plus text-blue-300 group-hover:text-blue-200"></i>
            </span>
            Зарегистрироваться
          </button>
        </div>
      </form>
      
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Уже есть аккаунт?
          <RouterLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            Войти
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  fullName: '',
  email: '',
  phone: '',
  position: '',
  companyName: '',
  inn: '',
  kpp: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const handleRegister = () => {
  // Здесь будет логика регистрации
  console.log('Register form submitted:', form.value)
  // После успешной регистрации перенаправляем в личный кабинет
  router.push('/account')
}
</script>