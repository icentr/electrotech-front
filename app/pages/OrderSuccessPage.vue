<template>
  <div class="pb-12">
    <div class="container mx-auto px-4">
      <!-- Хлебные крошки -->
      <div class="py-4">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-2">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <i class="fas fa-home mr-2"></i>
                Главная
              </NuxtLink>
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

      <div v-if="isLoading" class="text-center py-12">
        <i class="fas fa-spinner fa-spin text-gray-500 text-2xl"></i>
      </div>

      <div v-else-if="orderData" class="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
        <div class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-check text-green-600 text-2xl"></i>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 mb-4">Спасибо за ваш заказ!</h1>
        <p class="text-gray-600 mb-6">
          Ваш заказ <span class="font-medium text-gray-900">№{{ orderData.id }}</span> успешно оформлен.
        </p>

        <!-- Информация о заказе -->
        <div class="bg-blue-50 rounded-lg p-6 mb-8 text-left">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Информация о заказе</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Номер заказа</h3>
              <p class="font-medium">{{ orderData.id }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Дата оформления</h3>
              <p class="font-medium">{{ formatDate(orderData.date) }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Способ оплаты</h3>
              <p class="font-medium">
                {{
                  orderData.payment === 'invoice'
                    ? 'Безналичный расчет'
                    : orderData.payment === 'card'
                      ? 'Оплата картой'
                      : 'Не указан'
                }}
              </p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Способ получения</h3>
              <p class="font-medium">
                {{
                  orderData.delivery === 'pickup'
                    ? 'Самовывоз'
                    : orderData.delivery === 'courier'
                      ? 'Доставка курьером'
                      : orderData.delivery === 'transport'
                        ? 'Доставка транспортной компанией'
                        : 'Не указан'
                }}
              </p>
            </div>
            <div v-if="orderData.delivery !== 'pickup' && orderData.address">
              <h3 class="text-sm font-medium text-gray-500 mb-2">Адрес доставки</h3>
              <p class="font-medium">{{ orderData.address }}</p>
            </div>
          </div>

          <!-- Итоги -->
          <div class="border-t border-gray-200 pt-4">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Сумма заказа:</span>
              <span class="font-medium">{{ formatCurrency(orderData.subtotal) }}</span>
            </div>
            <div class="flex justify-between mb-2" v-if="orderData.discount > 0">
              <span class="text-gray-600">Скидка:</span>
              <span class="text-red-600 font-medium">-{{ formatCurrency(orderData.discount) }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Доставка:</span>
              <span class="font-medium">
                {{ orderData.deliveryCost === 0 ? 'Бесплатно' : formatCurrency(orderData.deliveryCost) }}
              </span>
            </div>
            <div class="flex justify-between text-lg font-bold text-gray-900 mt-3 pt-3 border-t border-gray-200">
              <span>Итого:</span>
              <span>{{ formatCurrency(orderData.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Счет на оплату -->
        <div class="mb-8" v-if="orderData.payment === 'invoice'">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Счет на оплату</h2>
          <div class="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div class="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-file-invoice text-blue-600"></i>
            </div>
            <p class="text-gray-600 mb-4">
              Счет №{{ orderData.invoiceNumber }} от {{ formatDate(orderData.invoiceDate) }} отправлен на ваш email
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-3">
              <a
                :href="orderData.invoicePdfUrl"
                target="_blank"
                class="bg-blue-600 text-white py-2 px-6 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                <i class="fas fa-download mr-2"></i> Скачать счет (PDF)
              </a>
              <button class="bg-gray-100 text-gray-800 py-2 px-6 rounded-md text-sm font-medium hover:bg-gray-200">
                <i class="fas fa-envelope mr-2"></i> Отправить повторно
              </button>
            </div>
          </div>
        </div>

        <!-- Кнопки -->
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            to="/catalog"
            class="bg-blue-600 text-white py-2 px-6 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <i class="fas fa-arrow-left mr-2"></i> Вернуться в каталог
          </NuxtLink>
          <NuxtLink
            to="/account/orders"
            class="bg-white border border-blue-600 text-blue-600 py-2 px-6 rounded-md text-sm font-medium hover:bg-blue-50"
          >
            <i class="fas fa-list-ul mr-2"></i> Мои заказы
          </NuxtLink>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500">Заказ не найден</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'

const orderData = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await api.get('/orders/get')
    const allOrders = response.data

    if (Array.isArray(allOrders) && allOrders.length > 0) {
      // Сортируем по дате создания — на случай, если порядок не гарантирован
      const sorted = allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      orderData.value = sorted[0]
    } else {
      orderData.value = null
    }
  } catch (error) {
    console.error('Ошибка при загрузке заказов:', error)
    orderData.value = null
  } finally {
    isLoading.value = false
  }
})

const formatCurrency = (amount) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(amount ?? 0)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
