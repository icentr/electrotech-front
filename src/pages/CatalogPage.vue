<!-- src/pages/CatalogPage.vue -->
<template>
  <div class="pb-12">

    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Боковая панель фильтров -->
        <aside class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm p-5 sticky top-4">
            <h2 class="text-lg font-bold text-gray-900 mb-5">Фильтры</h2>
            
            <div class="mb-6">
              <h3 class="text-sm font-semibold text-gray-900 mb-3 flex justify-between items-center">
                <span>Категории</span>
                <i class="fas fa-chevron-down text-xs text-gray-400"></i>
              </h3>
              <ul class="space-y-2">
                <li v-for="category in categories" :key="category.id">
                  <a href="#" class="text-gray-600 hover:text-blue-600 text-sm flex items-center">
                    <span class="w-4 h-4 border border-gray-300 rounded mr-2"></span>
                    {{ category.name }} ({{ category.count }})
                  </a>
                </li>
              </ul>
            </div>
            
            <div class="mb-6">
              <h3 class="text-sm font-semibold text-gray-900 mb-3">Цена, ₽</h3>
              <div class="flex items-center space-x-3 mb-3">
                <input type="number" placeholder="От" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <span class="text-gray-400">—</span>
                <input type="number" placeholder="До" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              </div>
            </div>
            
            <div class="mb-6" v-for="filter in filters" :key="filter.id">
              <h3 class="text-sm font-semibold text-gray-900 mb-3 flex justify-between items-center">
                <span>{{ filter.name }}</span>
                <i class="fas fa-chevron-down text-xs text-gray-400"></i>
              </h3>
              <ul class="space-y-2">
                <li v-for="option in filter.options" :key="option.id">
                  <a href="#" class="text-gray-600 hover:text-blue-600 text-sm flex items-center">
                    <span class="w-4 h-4 border border-gray-300 rounded mr-2"></span>
                    {{ option.name }} ({{ option.count }})
                  </a>
                </li>
              </ul>
            </div>
            
            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Применить фильтры
            </button>
          </div>
        </aside>

        <!-- Основная область с товарами -->
        <div class="lg:w-3/4">
          <!-- Заголовок и сортировка -->
          <div class="bg-white rounded-lg shadow-sm p-5 mb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Каталог товаров</h1>
              <div class="flex items-center">
                <span class="text-gray-600 text-sm mr-3">Сортировать:</span>
                <select class="border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                  <option>По популярности</option>
                  <option>По отзывам</option>
                  <option>По рейтингу</option>
                  <option>По цене (сначала дешевые)</option>
                  <option>По цене (сначала дорогие)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Список товаров -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard 
              v-for="product in products" 
              :key="product.id" 
              :product="product"
              @add-to-cart="addToCart"
            />
          </div>
          
          <!-- Пагинация -->
          <div class="mt-10 flex justify-center">
            <nav class="inline-flex rounded-md shadow-sm">
              <a href="#" class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                <i class="fas fa-chevron-left"></i>
              </a>
              <a href="#" class="px-4 py-2 border-t border-b border-gray-300 bg-white text-blue-600 font-medium">1</a>
              <a href="#" class="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">2</a>
              <a href="#" class="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">3</a>
              <a href="#" class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                <i class="fas fa-chevron-right"></i>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { RouterLink } from 'vue-router'

// Mock данные
const categories = ref([
  { id: 1, name: 'Промышленные контроллеры', count: 24 },
  { id: 2, name: 'Автоматические выключатели', count: 18 },
  { id: 3, name: 'Блоки питания', count: 15 },
  { id: 4, name: 'Клеммы и соединители', count: 32 },
  { id: 5, name: 'Кабельная продукция', count: 27 }
])

const filters = ref([
  {
    id: 1,
    name: 'Производитель',
    options: [
      { id: 1, name: 'ABB', count: 12 },
      { id: 2, name: 'Schneider Electric', count: 8 },
      { id: 3, name: 'Siemens', count: 15 },
      { id: 4, name: 'WAGO', count: 20 }
    ]
  },
  {
    id: 2,
    name: 'Наличие',
    options: [
      { id: 1, name: 'В наличии', count: 45 },
      { id: 2, name: 'Под заказ', count: 12 }
    ]
  }
])

const products = ref([
  {
    id: 1,
    name: 'Контроллер промышленный ABB AC500-S PM583-ETH',
    description: 'Модульный программируемый логический контроллер для автоматизации промышленных процессов',
    price: '45 890',
    oldPrice: '52 500',
    rating: 4,
    reviews: 12,
    inStock: true,
    badge: 'Хит',
    image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=ABB+AC500'
  },
  {
    id: 2,
    name: 'Автоматический выключатель Schneider Electric Easy9 25А 1P',
    description: 'Однополюсный автоматический выключатель с характеристикой C',
    price: '1 250',
    rating: 5,
    reviews: 8,
    inStock: true,
    badge: 'Новинка',
    image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Schneider+Easy9'
  },
  {
    id: 3,
    name: 'Блок питания Mean Well LRS-350-24',
    description: 'Импульсный блок питания 24В 14.6А 350Вт для промышленного применения',
    price: '3 890',
    oldPrice: '4 200',
    rating: 4,
    reviews: 5,
    inStock: false,
    image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Mean+Well+LRS'
  },
  {
    id: 4,
    name: 'Клеммная колодка WAGO 222-412',
    description: 'Соединительная клемма на 2 проводника с рычажным зажимом',
    price: '45',
    rating: 3,
    reviews: 3,
    inStock: true,
    image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=WAGO+222'
  },
  {
    id: 5,
    name: 'Контроллер Siemens SIMATIC S7-1200 CPU 1214C',
    description: 'Компактный программируемый контроллер с встроенными входами/выходами',
    price: '32 500',
    rating: 5,
    reviews: 15,
    inStock: true,
    badge: 'Хит',
    image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Siemens+S7-1200'
  },
  {
    id: 6,
    name: 'Блок питания Phoenix Contact QUINT-PS-100-240AC/24DC/5',
    description: 'Надежный источник питания 24В DC 5А с защитой от перегрузки',
    price: '12 300',
    rating: 4,
    reviews: 7,
    inStock: true,
    image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Phoenix+QUINT'
  }
])

const addToCart = (product) => {
  console.log('Добавлено в корзину:', product.name)
  // Здесь можно добавить логику добавления в корзину
}
</script>