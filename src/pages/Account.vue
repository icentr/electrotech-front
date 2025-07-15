<!-- src/views/Account.vue -->
<template>
  <div class="bg-gray-50 min-h-screen pb-12">
    <!-- Хлебные крошки -->
    <div class="container mx-auto px-4 py-6">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <RouterLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600">
              <i class="fas fa-home mr-2"></i>
              Главная
            </RouterLink>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <i class="fas fa-chevron-right text-gray-400 mx-2 text-xs"></i>
              <span class="ml-1 text-sm font-medium text-gray-700 md:ml-2">Личный кабинет</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>

    <!-- Основной контент -->
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Личный кабинет</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Левая колонка - информация о пользователе и компании -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Карточка пользователя -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex flex-col items-center mb-6">
              <div class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <i class="fas fa-user text-blue-600 text-3xl"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-900">{{ user.name }}</h2>
              <p class="text-gray-500">{{ user.position }}</p>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="bg-blue-50 rounded-lg w-10 h-10 flex items-center justify-center mr-4 text-blue-600">
                  <i class="fas fa-envelope"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="font-medium">{{ user.email }}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-50 rounded-lg w-10 h-10 flex items-center justify-center mr-4 text-blue-600">
                  <i class="fas fa-phone-alt"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Телефон</p>
                  <p class="font-medium">{{ user.phone || 'Не указан' }}</p>
                </div>
              </div>
              
              <button class="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                <i class="fas fa-edit mr-2"></i> Редактировать профиль
              </button>
            </div>
          </div>
          
          <!-- Карточка компании -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center mb-6">
              <div class="bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center mr-4 text-blue-600">
                <i class="fas fa-building"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-900">Информация о компании</h2>
            </div>
            
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-500">Название компании</p>
                <p class="font-medium">{{ company.name }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">ИНН</p>
                <p class="font-medium">{{ company.inn }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">КПП</p>
                <p class="font-medium">{{ company.kpp }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">Юридический адрес</p>
                <p class="font-medium">{{ company.legalAddress }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">Фактический адрес</p>
                <p class="font-medium">{{ company.actualAddress }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Правая колонка - история заказов -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">История заказов</h2>
              <button class="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                <i class="fas fa-file-export mr-2"></i> Экспорт в Excel
              </button>
            </div>
            
            <!-- Фильтры -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-search text-gray-400"></i>
                </div>
                <input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Поиск по заказам...">
              </div>
              
              <div class="flex space-x-4">
                <select class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Все статусы</option>
                  <option>Новый</option>
                  <option>В обработке</option>
                  <option>Доставка</option>
                  <option>Завершен</option>
                  <option>Отменен</option>
                </select>
                
                <select class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>За последние 3 месяца</option>
                  <option>За последние 6 месяцев</option>
                  <option>За последний год</option>
                  <option>За все время</option>
                </select>
              </div>
            </div>
            
            <!-- Таблица заказов -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№ заказа</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      <RouterLink :to="`/orders/${order.id}`" class="hover:underline">#{{ order.id }}</RouterLink>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(order.date) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(order.amount) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <RouterLink :to="`/orders/${order.id}`" class="text-blue-600 hover:text-blue-900 mr-4">
                        <i class="fas fa-eye"></i>
                      </RouterLink>
                      <button class="text-blue-600 hover:text-blue-900" @click="repeatOrder(order.id)">
                        <i class="fas fa-redo"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Пагинация -->
            <div class="flex items-center justify-between mt-6">
              <div class="text-sm text-gray-500">
                Показано с <span class="font-medium">1</span> по <span class="font-medium">5</span> из <span class="font-medium">12</span> заказов
              </div>
              <div class="flex space-x-2">
                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button class="px-3 py-1 rounded-lg border border-blue-500 bg-blue-50 text-blue-600 font-medium">1</button>
                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">2</button>
                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">3</button>
                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Быстрые действия -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center mb-4">
                <div class="bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center mr-4 text-blue-600">
                  <i class="fas fa-file-invoice"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">Реквизиты для оплаты</h3>
              </div>
              <p class="text-gray-600 mb-4">Скачайте актуальные реквизиты компании для оплаты по безналичному расчету</p>
              <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                <i class="fas fa-download mr-2"></i> Скачать реквизиты
              </button>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Данные пользователя
const user = ref({
  name: 'Иванов Алексей Петрович',
  email: 'a.ivanov@company.ru',
  position: 'Инженер по закупкам',
  phone: '+7 (912) 345-67-89'
})

// Данные компании
const company = ref({
  name: 'ООО "ПромТехСнаб"',
  inn: '1234567890',
  kpp: '123456001',
  legalAddress: 'г. Москва, ул. Ленина, д. 1, офис 101',
  actualAddress: 'г. Москва, ул. Промышленная, д. 15, склад 3'
})

// История заказов
const orders = ref([
  { id: 10245, date: '2023-05-15', amount: 87450, status: 'Завершен' },
  { id: 10232, date: '2023-04-28', amount: 124300, status: 'Завершен' },
  { id: 10218, date: '2023-04-10', amount: 56320, status: 'Завершен' },
  { id: 10195, date: '2023-03-22', amount: 187600, status: 'Завершен' },
  { id: 10172, date: '2023-03-05', amount: 43200, status: 'Завершен' }
])

// Форматирование даты
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('ru-RU', options)
}

// Форматирование валюты
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount)
}

// Классы для статусов заказов
const getStatusClass = (status) => {
  switch(status) {
    case 'Новый': return 'bg-blue-100 text-blue-800'
    case 'В обработке': return 'bg-yellow-100 text-yellow-800'
    case 'Доставка': return 'bg-purple-100 text-purple-800'
    case 'Завершен': return 'bg-green-100 text-green-800'
    case 'Отменен': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Повторить заказ
const repeatOrder = (orderId) => {
  console.log(`Повтор заказа #${orderId}`)
  // Здесь будет логика повторения заказа
}
</script>

<style scoped>
/* Дополнительные стили, если нужно */
</style>