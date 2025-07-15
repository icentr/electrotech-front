<!-- src/views/CheckoutPage.vue -->
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
            <li>
              <div class="flex items-center">
                <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                <RouterLink to="/cart" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Корзина</RouterLink>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Оформление заказа</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-6">Оформление заказа</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Основная часть - форма оформления -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
            <h2 class="text-lg font-bold text-gray-900 mb-6">Контактные данные</h2>
            
            <form @submit.prevent="submitOrder">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Фамилия *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    v-model="orderForm.lastName"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                </div>
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    v-model="orderForm.firstName"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="orderForm.email"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="orderForm.phone"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                </div>
              </div>
              
              <h2 class="text-lg font-bold text-gray-900 mb-6">Данные компании</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="companyName" class="block text-sm font-medium text-gray-700 mb-1">Название компании *</label>
                  <input 
                    type="text" 
                    id="companyName" 
                    v-model="orderForm.companyName"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                </div>
                <div>
                  <label for="inn" class="block text-sm font-medium text-gray-700 mb-1">ИНН *</label>
                  <input 
                    type="text" 
                    id="inn" 
                    v-model="orderForm.inn"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                </div>
                <div>
                  <label for="kpp" class="block text-sm font-medium text-gray-700 mb-1">КПП</label>
                  <input 
                    type="text" 
                    id="kpp" 
                    v-model="orderForm.kpp"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
                <div>
                  <label for="legalAddress" class="block text-sm font-medium text-gray-700 mb-1">Юридический адрес *</label>
                  <input 
                    type="text" 
                    id="legalAddress" 
                    v-model="orderForm.legalAddress"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                </div>
              </div>
              
              <h2 class="text-lg font-bold text-gray-900 mb-6">Доставка</h2>
              
              <div class="mb-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input 
                      type="radio" 
                      id="deliveryPickup" 
                      v-model="orderForm.deliveryType" 
                      value="pickup" 
                      class="hidden peer"
                    >
                    <label 
                      for="deliveryPickup" 
                      class="block p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50"
                    >
                      <div class="flex items-center">
                        <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <i class="fas fa-store text-blue-600 text-sm"></i>
                        </div>
                        <div>
                          <h3 class="font-medium text-gray-900">Самовывоз</h3>
                          <p class="text-sm text-gray-500">Бесплатно</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div>
                    <input 
                      type="radio" 
                      id="deliveryCourier" 
                      v-model="orderForm.deliveryType" 
                      value="courier" 
                      class="hidden peer"
                    >
                    <label 
                      for="deliveryCourier" 
                      class="block p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50"
                    >
                      <div class="flex items-center">
                        <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <i class="fas fa-truck text-blue-600 text-sm"></i>
                        </div>
                        <div>
                          <h3 class="font-medium text-gray-900">Курьером</h3>
                          <p class="text-sm text-gray-500">500 ₽ (бесплатно от 50 000 ₽)</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div>
                    <input 
                      type="radio" 
                      id="deliveryTransport" 
                      v-model="orderForm.deliveryType" 
                      value="transport" 
                      class="hidden peer"
                    >
                    <label 
                      for="deliveryTransport" 
                      class="block p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50"
                    >
                      <div class="flex items-center">
                        <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <i class="fas fa-shipping-fast text-blue-600 text-sm"></i>
                        </div>
                        <div>
                          <h3 class="font-medium text-gray-900">Транспортная компания</h3>
                          <p class="text-sm text-gray-500">По тарифам ТК</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div v-if="orderForm.deliveryType === 'courier' || orderForm.deliveryType === 'transport'">
                  <label for="deliveryAddress" class="block text-sm font-medium text-gray-700 mb-1">Адрес доставки *</label>
                  <textarea 
                    id="deliveryAddress" 
                    v-model="orderForm.deliveryAddress"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    required
                  ></textarea>
                </div>
              </div>
              
              <h2 class="text-lg font-bold text-gray-900 mb-6">Оплата</h2>
              
              <div class="mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="radio" 
                      id="paymentInvoice" 
                      v-model="orderForm.paymentMethod" 
                      value="invoice" 
                      class="hidden peer"
                    >
                    <label 
                      for="paymentInvoice" 
                      class="block p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50"
                    >
                      <div class="flex items-center">
                        <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <i class="fas fa-file-invoice text-blue-600 text-sm"></i>
                        </div>
                        <div>
                          <h3 class="font-medium text-gray-900">Безналичный расчет</h3>
                          <p class="text-sm text-gray-500">Выставление счета</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div>
                    <input 
                      type="radio" 
                      id="paymentCard" 
                      v-model="orderForm.paymentMethod" 
                      value="card" 
                      class="hidden peer"
                    >
                    <label 
                      for="paymentCard" 
                      class="block p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50"
                    >
                      <div class="flex items-center">
                        <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <i class="fas fa-credit-card text-blue-600 text-sm"></i>
                        </div>
                        <div>
                          <h3 class="font-medium text-gray-900">Оплата картой</h3>
                          <p class="text-sm text-gray-500">Онлайн-оплата</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="mb-6">
                <label for="comments" class="block text-sm font-medium text-gray-700 mb-1">Комментарий к заказу</label>
                <textarea 
                  id="comments" 
                  v-model="orderForm.comments"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Укажите дополнительные пожелания по заказу..."
                ></textarea>
              </div>
              
              <div class="flex items-start">
                <input 
                  type="checkbox" 
                  id="agreeTerms" 
                  v-model="orderForm.agreeTerms"
                  class="mt-1 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  required
                >
                <label for="agreeTerms" class="text-sm text-gray-700">
                  Я согласен с <a href="#" class="text-blue-600 hover:underline">условиями обработки персональных данных</a> и <a href="#" class="text-blue-600 hover:underline">договором оферты</a>
                </label>
              </div>
            </form>
          </div>
        </div>
        
        <!-- Боковая панель - итоги заказа -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-4">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Ваш заказ</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Товары ({{ cartStore.totalItems }})</span>
                <span class="font-medium">{{ formatCurrency(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Скидка</span>
                <span class="text-red-600 font-medium">-{{ formatCurrency(cartStore.discount) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Доставка</span>
                <span class="font-medium">{{ deliveryCost === 0 ? 'Бесплатно' : formatCurrency(deliveryCost) }}</span>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-4 mb-6">
              <div class="flex justify-between text-lg font-bold text-gray-900">
                <span>Итого</span>
                <span>{{ formatCurrency(total) }}</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              @click="submitOrder"
              :disabled="isSubmitting"
            >
              <template v-if="isSubmitting">
                <i class="fas fa-spinner fa-spin mr-2"></i> Оформление...
              </template>
              <template v-else>
                <i class="fas fa-credit-card mr-2"></i> Оформить заказ
              </template>
            </button>
            
            <div class="mt-4 text-xs text-gray-500">
              После оформления заказа вам будет выставлен счет на оплату
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

// Проверка на пустую корзину при загрузке
onMounted(() => {
  if (cartStore.totalItems === 0) {
    router.push('/cart')
  }
})

// Форма заказа
const orderForm = ref({
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  companyName: '',
  inn: '',
  kpp: '',
  legalAddress: '',
  deliveryType: 'pickup',
  deliveryAddress: '',
  paymentMethod: 'invoice',
  comments: '',
  agreeTerms: false
})

const isSubmitting = ref(false)

// Форматирование валюты
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(amount)
}

// Стоимость доставки
const deliveryCost = computed(() => {
  if (orderForm.value.deliveryType === 'pickup') return 0
  if (cartStore.subtotal - cartStore.discount >= 50000) return 0
  return orderForm.value.deliveryType === 'courier' ? 500 : 0
})

// Итоговая сумма
const total = computed(() => {
  return cartStore.subtotal - cartStore.discount + deliveryCost.value
})

// Отправка заказа
const submitOrder = async () => {
  if (!orderForm.value.agreeTerms) {
    alert('Пожалуйста, согласитесь с условиями обработки данных')
    return
  }

  if (cartStore.totalItems === 0) {
    alert('Ваша корзина пуста')
    return
  }

  isSubmitting.value = true
  
  try {
    // Генерация данных заказа
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`
    const invoiceDate = new Date().toLocaleDateString('ru-RU')
    
    const orderData = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString('ru-RU'),
      invoiceNumber,
      invoiceDate,
      customer: {
        name: `${orderForm.value.lastName} ${orderForm.value.firstName}`,
        company: orderForm.value.companyName,
        email: orderForm.value.email,
        phone: orderForm.value.phone
      },
      delivery: {
        type: orderForm.value.deliveryType,
        address: orderForm.value.deliveryAddress || 'Самовывоз'
      },
      payment: orderForm.value.paymentMethod,
      items: [...cartStore.cartItems],
      subtotal: cartStore.subtotal,
      discount: cartStore.discount,
      deliveryCost: deliveryCost.value,
      total: total.value
    }
    
    // Сохранение в localStorage для страницы успешного заказа
    localStorage.setItem('lastOrder', JSON.stringify(orderData))
    
    // Переход на страницу подтверждения
    router.push({
      path: '/order-success',
      state: { orderData }
    })
    
    // Очистка корзины
    cartStore.clearCart()
    
  } catch (error) {
    console.error('Ошибка при оформлении заказа:', error)
    alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.')
  } finally {
    isSubmitting.value = false
  }
}
</script>