<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import api from "../api";
import { useCartStore } from "../stores/cart";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/16/solid";

const cart = useCartStore();

const products = ref([]);
const page = ref(1);
const totalPages = ref(1);
const sortOption = ref("popularity");
const priceMin = ref(null);
const priceMax = ref(null);

const selectedFilters = ref({
    categories: [],
    manufacturers: [],
    stock: [],
});

const categories = ref([
    { id: 1, name: "Промышленные контроллеры", count: 24 },
    { id: 2, name: "Автоматические выключатели", count: 18 },
    { id: 3, name: "Блоки питания", count: 15 },
    { id: 4, name: "Клеммы и соединители", count: 32 },
    { id: 5, name: "Кабельная продукция", count: 27 },
]);

const filters = ref([
    {
        id: 1,
        name: "Производитель",
        key: "manufacturers",
        options: [
            { id: 1, name: "ABB", count: 12 },
            { id: 2, name: "Schneider Electric", count: 8 },
            { id: 3, name: "Siemens", count: 15 },
            { id: 4, name: "WAGO", count: 20 },
        ],
    },
    {
        id: 2,
        name: "Наличие",
        key: "stock",
        options: [
            { id: 1, name: "В наличии", count: 45 },
            { id: 2, name: "Под заказ", count: 12 },
        ],
    },
]);

const fetchProducts = async () => {
    try {
        // Формируем путь с номером страницы
        const response = await api.get(`/products/all/${page.value}`);
        // Если API поддерживает сортировку/фильтрацию, нужно будет менять код
        // Но сейчас в API сортировка и фильтры не указаны, значит их пока не используем

        products.value = response.data.products || [];
        totalPages.value = response.data.totalPages || 1; // Тут, возможно, придётся вычислять вручную, если API не возвращает totalPages
    } catch (error) {
        console.error("Ошибка при получении каталога:", error);
    }
};

const applyFilters = () => {
    page.value = 1;
    fetchProducts();
};

const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
        page.value = newPage;
        fetchProducts();
    }
};

const addToCart = (product) => {
    cart.addToCart(product);
};

onMounted(fetchProducts);
</script>
<template>
    <div class="pb-12">
        <div class="container mx-auto px-4">
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Боковая панель фильтров -->
                <aside class="lg:w-1/4">
                    <div class="bg-white rounded-lg shadow-sm p-5 sticky top-4">
                        <h2 class="text-lg font-bold text-gray-900 mb-5">Фильтры</h2>

                        <!-- Категории -->
                        <div class="mb-6">
                            <h3 class="text-sm font-semibold text-gray-900 mb-3 flex justify-between items-center">
                                <span>Категории</span>
                            </h3>
                            <ul class="space-y-2">
                                <li v-for="category in categories" :key="category.id">
                                    <label class="text-gray-600 hover:text-blue-600 text-sm flex items-center cursor-pointer">
                                        <input type="checkbox" class="mr-2" :value="category.name" v-model="selectedFilters.categories" />
                                        {{ category.name }} ({{ category.count }})
                                    </label>
                                </li>
                            </ul>
                        </div>

                        <!-- Цена -->
                        <div class="mb-6">
                            <h3 class="text-sm font-semibold text-gray-900 mb-3">Цена, ₽</h3>
                            <div class="flex items-center space-x-3 mb-3">
                                <input v-model.number="priceMin" type="number" placeholder="От" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm no-spinner" />
                                <span class="text-gray-400">—</span>
                                <input v-model.number="priceMax" type="number" placeholder="До" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm no-spinner" />
                            </div>
                        </div>

                        <!-- Остальные фильтры -->
                        <div class="mb-6" v-for="filter in filters" :key="filter.id">
                            <h3 class="text-sm font-semibold text-gray-900 mb-3 flex justify-between items-center">
                                <span>{{ filter.name }}</span>
                            </h3>
                            <ul class="space-y-2">
                                <li v-for="option in filter.options" :key="option.id">
                                    <label class="text-gray-600 hover:text-blue-600 text-sm flex items-center cursor-pointer">
                                        <input type="checkbox" class="mr-2" :value="option.name" v-model="selectedFilters[filter.key]" />
                                        {{ option.name }} ({{ option.count }})
                                    </label>
                                </li>
                            </ul>
                        </div>

                        <button @click="applyFilters" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">Применить фильтры</button>
                    </div>
                </aside>

                <!-- Основная область с товарами -->
                <div class="lg:w-3/4">
                    <div class="bg-white rounded-lg shadow-sm p-5 mb-6">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h1 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Каталог товаров</h1>
                            <!-- <div class="flex items-center">
                                <span class="text-gray-600 text-sm mr-3">Сортировать:</span>
                                <select v-model="sortOption" class="border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md text-sm">
                                    <option value="popularity">По популярности</option>
                                    <option value="rating">По рейтингу</option>
                                    <option value="cheap">По цене (сначала дешевые)</option>
                                    <option value="expensive">По цене (сначала дорогие)</option>
                                </select>
                            </div> -->
                        </div>
                    </div>

                    <!-- Список товаров -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ProductCard v-for="product in products" :key="product.id" :product="product" @add-to-cart="addToCart" />
                    </div>

                    <!-- Пагинаdция -->
                    <div class="mt-10 flex justify-center">
                        <nav class="inline-flex rounded-md shadow-sm">
                            <button @click="goToPage(page - 1)" :disabled="page === 1" class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                <ArrowLeftIcon class="size-5" />
                            </button>
                            <button
                                v-for="n in totalPages"
                                :key="n"
                                @click="goToPage(n)"
                                class="px-4 py-2 border border-gray-300"
                                :class="{
                                    'bg-white text-gray-500 hover:bg-gray-50': n !== page,
                                    'bg-blue-50 text-blue-600 font-medium': n === page,
                                }">
                                {{ n }}
                            </button>
                            <button @click="goToPage(page + 1)" :disabled="page === totalPages" class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                <ArrowRightIcon class="size-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
