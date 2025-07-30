<!-- src/views/OrderSuccessPage.vue -->
<template>
  <div class="pb-12">
    <div class="container mx-auto px-4">
      <!-- Хлебные крошки -->
      <div class="py-4">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-2">
            <li class="inline-flex items-center">
              <RouterLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <i class="fas fa-home mr-2"></i>
                Главная
              </RouterLink>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Заказ оформлен</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
        <div class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-check text-green-600 text-2xl"></i>
        </div>
        
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Спасибо за ваш заказ!</h1>
        <p class="text-gray-600 mb-6">Ваш заказ <span class="font-medium text-gray-900">№{{ orderData.id }}</span> успешно оформлен. В ближайшее время с вами свяжется наш менеджер для подтверждения.</p>
        
        <div class="bg-blue-50 rounded-lg p-6 mb-8 text-left">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Информация о заказе</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Номер заказа</h3>
              <p class="font-medium">{{ orderData.id }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Дата оформления</h3>
              <p class="font-medium">{{ orderData.date }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Способ оплаты</h3>
              <p class="font-medium">{{ orderData.payment === 'invoice' ? 'Безналичный расчет' : 'Оплата картой' }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Способ получения</h3>
              <p class="font-medium">{{ 
                orderData.delivery.type === 'pickup' ? 'Самовывоз' : 
                orderData.delivery.type === 'courier' ? 'Доставка курьером' : 
                'Доставка транспортной компанией' 
              }}</p>
            </div>
            <div v-if="orderData.delivery.type !== 'pickup'">
              <h3 class="text-sm font-medium text-gray-500 mb-2">Адрес доставки</h3>
              <p class="font-medium">{{ orderData.delivery.address }}</p>
            </div>
          </div>
          
          <div class="border-t border-gray-200 pt-4">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Сумма заказа:</span>
              <span class="font-medium">{{ formatCurrency(orderData.subtotal) }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Скидка:</span>
              <span class="text-red-600 font-medium">-{{ formatCurrency(orderData.discount) }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Доставка:</span>
              <span class="font-medium">{{ orderData.deliveryCost === 0 ? 'Бесплатно' : formatCurrency(orderData.deliveryCost) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold text-gray-900 mt-3 pt-3 border-t border-gray-200">
              <span>Итого:</span>
              <span>{{ formatCurrency(orderData.total) }}</span>
            </div>
          </div>
        </div>
        
        <div class="mb-8" v-if="orderData.payment === 'invoice'">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Счет на оплату</h2>
          <div class="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div class="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-file-invoice text-blue-600"></i>
            </div>
            <p class="text-gray-600 mb-4">Счет №{{ orderData.invoiceNumber }} от {{ orderData.invoiceDate }} был отправлен на ваш email</p>
            <div class="flex flex-col sm:flex-row justify-center gap-3">
              <button class="bg-blue-600 text-white py-2 px-6 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                <i class="fas fa-download mr-2"></i> Скачать счет (PDF)
              </button>
              <button class="bg-gray-100 text-gray-800 py-2 px-6 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                <i class="fas fa-envelope mr-2"></i> Отправить повторно
              </button>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink 
            to="/catalog" 
            class="bg-blue-600 text-white py-2 px-6 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
          >
            <i class="fas fa-arrow-left mr-2"></i> Вернуться в каталог
          </RouterLink>
          <RouterLink 
            to="/account/orders" 
            class="bg-white border border-blue-600 text-blue-600 py-2 px-6 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
          >
            <i class="fas fa-list-ul mr-2"></i> Мои заказы
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const orderData = ref({})

// Форматирование валюты
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(amount)
}

onMounted(() => {
  // Получаем данные заказа из состояния маршрута или localStorage
  if (router.currentRoute.value.state?.orderData) {
    orderData.value = router.currentRoute.value.state.orderData
    localStorage.setItem('lastOrder', JSON.stringify(orderData.value))
  } else {
    const savedOrder = localStorage.getItem('lastOrder')
    if (savedOrder) {
      orderData.value = JSON.parse(savedOrder)
    } else {
      // Если данных нет, перенаправляем на главную
      router.push('/')
    }
  }
})
</script>