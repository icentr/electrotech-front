<!-- src/pages/ProductPage.vue -->
<template>
  <div class="pb-12" v-if="product">
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
                <RouterLink to="/catalog" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Каталог</RouterLink>
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Блоки питания</a>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{ product.name }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Основная информация о товаре -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Изображение товара -->
              <div class="md:w-1/3">
                <div class="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                  <img :src="product.image" :alt="product.name" class="max-h-full">
                </div>
              </div>
              
              <!-- Основные характеристики -->
              <div class="md:w-2/3">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
                <div class="flex items-center mb-4">
                  <div class="flex text-yellow-400 mr-2">
                    <i class="fas fa-star" v-for="i in 5" :key="i" :class="{'text-gray-300': i > product.rating}"></i>
                  </div>
                  <span class="text-gray-600 text-sm">{{ product.reviews }} отзывов</span>
                </div>
                
                <div class="mb-6">
                  <div class="flex items-baseline mb-2">
                    <span class="text-3xl font-bold text-gray-900 mr-3">{{ product.price }} ₽</span>
                    <span v-if="product.oldPrice" class="text-lg text-gray-500 line-through">{{ product.oldPrice }} ₽</span>
                    <span v-if="product.oldPrice" class="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">-{{ Math.round((1 - parseFloat(product.price.replace(/\s/g, '')) / parseFloat(product.oldPrice.replace(/\s/g, ''))) * 100) }}%</span>
                  </div>
                  <div class="text-green-600 text-sm font-medium" v-if="product.inStock">В наличии</div>
                  <div class="text-gray-500 text-sm" v-else>Под заказ</div>
                </div>
                
                <!-- Ключевые преимущества -->
                <div class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Ключевые преимущества:</h3>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>Высокая эффективность (КПД 90%)</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>Надежная защита от перегрузок и короткого замыкания</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>Компактные габариты для удобного монтажа</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>Длительный срок службы (до 50 000 часов)</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>Широкий диапазон входного напряжения (110-240В)</span>
                    </li>
                  </ul>
                </div>
                
                <!-- Кнопки действий -->
                <div class="flex flex-col sm:flex-row gap-3">
                  <button 
                    class="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                    @click="addToCart"
                  >
                    <i class="fas fa-shopping-cart mr-2"></i>
                    В корзину
                  </button>
                  <button class="flex-1 bg-white border border-blue-600 text-blue-600 py-3 px-4 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
                    <i class="fas fa-heart mr-2"></i>
                    В избранное
                  </button>
                </div>
                
                <!-- Контакты менеджера -->
                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div class="flex items-start">
                    <div class="bg-blue-100 p-2 rounded-full mr-3">
                      <i class="fas fa-headset text-blue-600"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-semibold text-gray-900 mb-1">Есть вопросы по товару?</h3>
                      <p class="text-sm text-gray-600 mb-3">Наш менеджер поможет вам с выбором и ответит на все вопросы</p>
                      <a href="tel:+78001234567" class="bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors inline-flex items-center">
                        <i class="fas fa-phone-alt mr-2"></i>
                        Позвонить менеджеру
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Подробное описание и характеристики -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Описание товара</h2>
            <p class="text-gray-700 mb-6">{{ product.description }}</p>
            
            <h2 class="text-xl font-bold text-gray-900 mb-4">Технические характеристики</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex justify-between border-b border-gray-100 py-2">
                <span class="text-gray-600">Мощность</span>
                <span class="text-gray-900 font-medium">36Вт</span>
              </div>
              <div class="flex justify-between border-b border-gray-100 py-2">
                <span class="text-gray-600">Выходное напряжение</span>
                <span class="text-gray-900 font-medium">54В</span>
              </div>
              <div class="flex justify-between border-b border-gray-100 py-2">
                <span class="text-gray-600">Входное напряжение</span>
                <span class="text-gray-900 font-medium">110-240В AC</span>
              </div>
              <div class="flex justify-between border-b border-gray-100 py-2">
                <span class="text-gray-600">КПД</span>
                <span class="text-gray-900 font-medium">90%</span>
              </div>
              <div class="flex justify-between border-b border-gray-100 py-2">
                <span class="text-gray-600">Габариты</span>
                <span class="text-gray-900 font-medium">87.6×38.6×90.4 мм</span>
              </div>
              <div class="flex justify-between border-b border-gray-100 py-2">
                <span class="text-gray-600">Срок службы</span>
                <span class="text-gray-900 font-medium">50 000 часов</span>
              </div>
              <div class="flex justify-between border-b border-gray-100 py-2">
                <span class="text-gray-600">Защита</span>
                <span class="text-gray-900 font-medium">От перегрузки, КЗ, перегрева</span>
              </div>
              <div class="flex justify-between border-b border-gray-100 py-2">
                <span class="text-gray-600">Код товара</span>
                <span class="text-gray-900 font-medium">341-0-021</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Боковая панель -->
        <div class="lg:w-1/3">
          <!-- Доставка и оплата -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-4">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Доставка и оплата</h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-3">
                  <i class="fas fa-truck text-blue-600"></i>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-1">Доставка по Москве</h3>
                  <p class="text-sm text-gray-600">Курьером - 300₽, бесплатно от 5000₽</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-3">
                  <i class="fas fa-boxes text-blue-600"></i>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-1">Самовывоз</h3>
                  <p class="text-sm text-gray-600">Бесплатно из нашего магазина</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-3">
                  <i class="fas fa-credit-card text-blue-600"></i>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-1">Способы оплаты</h3>
                  <p class="text-sm text-gray-600">Наличные, карта, безналичный расчет</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Похожие товары -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Вам может понравиться</h2>
            <div class="space-y-4">
              <div class="flex items-center border-b border-gray-100 pb-4">
                <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                  <img src="https://via.placeholder.com/80x80/1e3a8a/ffffff?text=LED+54W" alt="LED-драйвер 54Вт" class="max-h-full">
                </div>
                <div>
                  <RouterLink to="/catalog/2" class="text-sm font-medium text-gray-900 mb-1 hover:text-blue-600">LED-драйвер Gigant 54Вт</RouterLink>
                  <p class="text-sm text-gray-600 mb-1">5 290 ₽</p>
                  <button class="text-xs text-blue-600 hover:text-blue-800">В корзину</button>
                </div>
              </div>
              <div class="flex items-center border-b border-gray-100 pb-4">
                <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                  <img src="https://via.placeholder.com/80x80/1e3a8a/ffffff?text=LED+24W" alt="LED-драйвер 24Вт" class="max-h-full">
                </div>
                <div>
                  <RouterLink to="/catalog/3" class="text-sm font-medium text-gray-900 mb-1 hover:text-blue-600">LED-драйвер Gigant 24Вт</RouterLink>
                  <p class="text-sm text-gray-600 mb-1">2 990 ₽</p>
                  <button class="text-xs text-blue-600 hover:text-blue-800">В корзину</button>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                  <img src="https://via.placeholder.com/80x80/1e3a8a/ffffff?text=LED+72W" alt="LED-драйвер 72Вт" class="max-h-full">
                </div>
                <div>
                  <RouterLink to="/catalog/4" class="text-sm font-medium text-gray-900 mb-1 hover:text-blue-600">LED-драйвер Gigant 72Вт</RouterLink>
                  <p class="text-sm text-gray-600 mb-1">6 890 ₽</p>
                  <button class="text-xs text-blue-600 hover:text-blue-800">В корзину</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'

const route = useRoute()
const product = ref(null)

// Mock функция для получения данных товара
const fetchProduct = (id) => {
  // В реальном приложении здесь будет запрос к API
  const mockProducts = [
    {
      id: 1,
      name: 'LED-драйвер Gigant для LED светильников 36Вт, 54В G-TSD-L4-36W',
      description: 'LED-драйвер Gigant предназначен для питания светодиодных светильников мощностью 36Вт с выходным напряжением 54В. Обеспечивает стабильное питание и защиту светодиодных модулей от перепадов напряжения. Подходит для промышленного и коммерческого освещения.',
      price: '3 842',
      oldPrice: '4 200',
      rating: 4.5,
      reviews: 12,
      inStock: true,
      badge: 'Хит',
      image: 'https://via.placeholder.com/300x300/1e3a8a/ffffff?text=LED+Gigant+36W'
    },
    {
      id: 2,
      name: 'LED-драйвер Gigant 54Вт',
      description: 'LED-драйвер для светильников 54Вт',
      price: '5 290',
      oldPrice: '5 800',
      rating: 4,
      reviews: 8,
      inStock: true,
      image: 'https://via.placeholder.com/300x300/1e3a8a/ffffff?text=LED+54W'
    },
    {
      id: 3,
      name: 'LED-драйвер Gigant 24Вт',
      description: 'LED-драйвер для светильников 24Вт',
      price: '2 990',
      rating: 4,
      reviews: 5,
      inStock: true,
      image: 'https://via.placeholder.com/300x300/1e3a8a/ffffff?text=LED+24W'
    },
    {
      id: 4,
      name: 'LED-драйвер Gigant 72Вт',
      description: 'LED-драйвер для светильников 72Вт',
      price: '6 890',
      oldPrice: '7 500',
      rating: 5,
      reviews: 15,
      inStock: false,
      image: 'https://via.placeholder.com/300x300/1e3a8a/ffffff?text=LED+72W'
    }
  ]
  
  return mockProducts.find(p => p.id === parseInt(id))
}

onMounted(() => {
  product.value = fetchProduct(route.params.id)
})

const addToCart = () => {
  console.log('Добавлено в корзину:', product.value.name)
  // Здесь можно добавить логику добавления в корзину
}
</script>