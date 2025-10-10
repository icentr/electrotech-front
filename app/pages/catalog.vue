<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import { useCartStore } from "../stores/cart";
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon, FunnelIcon } from "@heroicons/vue/16/solid";
import { getApi } from "@/api";

const api = getApi();

useHead({
  title: 'Каталог',
})

const cart = useCartStore();

const products = ref([]);
const page = ref(1);
const totalPages = ref(1);
const priceMin = ref(null);
const priceMax = ref(null);
const filters = ref([]);
const categories = ref([]);

// Новые реактивные переменные для мобильной фильтрации
const isFiltersOpen = ref(false);
const activeFilterSection = ref(null);

const fetchFilters = async () => {
    try {
        const response = await api.get("/filters");
        const rawFilters = response.data.parameters;

        filters.value = [];
        categories.value = [];

        rawFilters.forEach((f, index) => {
            const name = f.name?.trim() || `Фильтр ${index + 1}`;

            if (f.type === "list" && f.values && f.values.length > 0) {
                filters.value.push({
                    name,
                    type: f.type,
                    options: f.values
                        .filter((v) => v)
                        .map((v, i) => ({
                            id: i,
                            name: v,
                            selected: false,
                            count: 0,
                        })),
                });
            } else if (f.type === "number") {
                filters.value.push({
                    name,
                    type: f.type,
                    min: f.minValue,
                    max: f.maxValue,
                    inputMin: f.minValue,
                    inputMax: f.maxValue,
                });
            } else {
                console.error(`Неизвестный тип фильтра: ${f.type}`);
            }

            if (name.toLowerCase().includes("категори")) {
                categories.value = f.values.map((v, i) => ({
                    id: i,
                    name: v,
                    count: 0,
                }));

                selectedFilters.value.categories = [];
            }

            if (f.type === "number") {
                if (name.toLowerCase().includes("цен")) {
                    priceMin.value = null;
                    priceMax.value = f.maxValue;
                }
            }
        });
    } catch (error) {
        console.error("Ошибка при загрузке фильтров:", error);
    }
};

const fetchProducts = async () => {
    try {
        const filtersPayload = [];

        filters.value.forEach((f) => {
            if (f.type === "list") {
                const selectedOptions = f.options.filter((o) => o.selected);

                if (selectedOptions.length == 0) return;

                filtersPayload.push({
                    parameter: f.name,
                    type: f.type,
                    values: f.options.filter((o) => o.selected).map((o) => o.name),
                });
            } else if (f.type === "number") {
                if (f.inputMax == f.max && f.inputMin == f.min) {
                    console.warn(`Фильтр ${f.name} не имеет значений`);
                    return;
                }
                filtersPayload.push({
                    parameter: f.name,
                    type: f.type,
                    min: f.inputMin,
                    max: f.inputMax,
                });
            } else {
                console.warn(`Неизвестный тип фильтра: ${f.type}`);
            }
        });

        console.log("Отправляем фильтры:", filtersPayload);

        const response = await api.post("/products/filter", {
            page: page.value - 1,
            filters: filtersPayload,
        });

        products.value = response.data.products || [];
        totalPages.value = response.data.totalPages || 1;
    } catch (error) {
        console.error("Ошибка при фильтрации товаров:", error);
    }
};

const applyFilters = () => {
    page.value = 1;
    fetchProducts();
    isFiltersOpen.value = false; // Закрываем фильтры после применения
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

// Функции для мобильной фильтрации
const openFilters = () => {
    isFiltersOpen.value = true;
};

const closeFilters = () => {
    isFiltersOpen.value = false;
    activeFilterSection.value = null;
};

const toggleFilterSection = (filterName) => {
    activeFilterSection.value = activeFilterSection.value === filterName ? null : filterName;
};

const clearAllFilters = () => {
    filters.value.forEach(filter => {
        if (filter.type === 'list') {
            filter.options.forEach(option => {
                option.selected = false;
            });
        } else if (filter.type === 'number') {
            filter.inputMin = filter.min;
            filter.inputMax = filter.max;
        }
    });
};

// Подсчет активных фильтров для бейджа
const activeFiltersCount = () => {
    let count = 0;
    filters.value.forEach(filter => {
        if (filter.type === 'list') {
            count += filter.options.filter(option => option.selected).length;
        } else if (filter.type === 'number') {
            if (filter.inputMin !== filter.min || filter.inputMax !== filter.max) {
                count++;
            }
        }
    });
    return count;
};

onMounted(async () => {
    await fetchFilters();
    await fetchProducts();
});
</script>

<template>
    <div class="pb-12">
        <div class="container mx-auto px-4">
            <!-- Кнопка открытия фильтров для мобильных -->
            <div class="lg:hidden mb-4">
                <button 
                    @click="openFilters" 
                    class="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-between text-gray-900 hover:bg-gray-50 transition-colors"
                >
                    <div class="flex items-center gap-2">
                        <FunnelIcon class="size-5" />
                        <span class="font-medium">Фильтры</span>
                        <span 
                            v-if="activeFiltersCount() > 0" 
                            class="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-5 h-5 flex items-center justify-center"
                        >
                            {{ activeFiltersCount() }}
                        </span>
                    </div>
                    <svg class="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Боковая панель фильтров для десктопа -->
                <aside class="hidden lg:block lg:w-1/4">
                    <div class="bg-white rounded-lg shadow-sm p-5 sticky top-4">
                        <h2 class="text-lg font-bold text-gray-900 mb-5">Фильтры</h2>

                        <div class="mb-6" v-for="filter in filters" :key="filter.id">
                            <h3 class="text-sm font-semibold text-gray-900 mb-3 flex justify-between items-center">
                                <span>{{ filter.name }}</span>
                            </h3>
                            <ul v-if="filter.type == 'list'" class="space-y-2">
                                <li v-for="option in filter.options" :key="option.id">
                                    <label class="text-gray-600 hover:text-blue-600 text-sm flex items-center cursor-pointer">
                                        <input type="checkbox" class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" :value="option.name" v-model="option.selected" />
                                        {{ option.name }} ({{ option.count }})
                                    </label>
                                </li>
                            </ul>
                            <div v-if="filter.type == 'number'" class="flex gap-2">
                                <input type="number" placeholder="От" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm no-spinner" v-model.number="filter.inputMin" />
                                <span class="text-gray-400 flex items-center">—</span>
                                <input type="number" placeholder="До" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm no-spinner" v-model.number="filter.inputMax" />
                            </div>
                        </div>

                        <button @click="applyFilters" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                            Применить фильтры
                        </button>
                    </div>
                </aside>

                <!-- Мобильная панель фильтров -->
                <div v-if="isFiltersOpen" class="fixed inset-0 z-50 lg:hidden">
                    <!-- Затемненный фон -->
                    <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeFilters"></div>
                    
                    <!-- Панель фильтров -->
                    <div class="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform">
                        <div class="flex flex-col h-full">
                            <!-- Заголовок -->
                            <div class="flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 class="text-lg font-bold text-gray-900">Фильтры</h2>
                                <div class="flex items-center gap-2">
                                    <button 
                                        v-if="activeFiltersCount() > 0"
                                        @click="clearAllFilters" 
                                        class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Сбросить
                                    </button>
                                    <button @click="closeFilters" class="p-1 hover:bg-gray-100 rounded">
                                        <XMarkIcon class="size-5" />
                                    </button>
                                </div>
                            </div>

                            <!-- Список фильтров -->
                            <div class="flex-1 overflow-y-auto">
                                <div v-for="filter in filters" :key="filter.id" class="border-b border-gray-200">
                                    <!-- Заголовок секции фильтра -->
                                    <button 
                                        @click="toggleFilterSection(filter.name)"
                                        class="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <div class="flex items-center gap-2">
                                            <span class="font-medium text-gray-900">{{ filter.name }}</span>
                                            <span 
                                                v-if="filter.type === 'list' && filter.options.filter(o => o.selected).length > 0"
                                                class="bg-blue-600 text-white text-xs rounded-full px-2 py-1"
                                            >
                                                {{ filter.options.filter(o => o.selected).length }}
                                            </span>
                                        </div>
                                        <svg 
                                            class="size-4 text-gray-400 transition-transform" 
                                            :class="{ 'rotate-90': activeFilterSection === filter.name }"
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    <!-- Контент секции фильтра -->
                                    <div 
                                        v-if="activeFilterSection === filter.name" 
                                        class="px-4 pb-4 bg-gray-50"
                                    >
                                        <!-- Список опций -->
                                        <ul v-if="filter.type == 'list'" class="space-y-3">
                                            <li v-for="option in filter.options" :key="option.id">
                                                <label class="text-gray-700 text-sm flex items-center cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                                                        :value="option.name" 
                                                        v-model="option.selected" 
                                                    />
                                                    <span class="flex-1">{{ option.name }}</span>
                                                    <span class="text-gray-400 text-xs">({{ option.count }})</span>
                                                </label>
                                            </li>
                                        </ul>

                                        <!-- Числовые поля -->
                                        <div v-if="filter.type == 'number'" class="space-y-3">
                                            <div class="flex gap-2">
                                                <input 
                                                    type="number" 
                                                    placeholder="От" 
                                                    class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm no-spinner" 
                                                    v-model.number="filter.inputMin" 
                                                />
                                                <input 
                                                    type="number" 
                                                    placeholder="До" 
                                                    class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm no-spinner" 
                                                    v-model.number="filter.inputMax" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Кнопка применения -->
                            <div class="p-4 pb-20 border-t border-gray-200 bg-white">
                                <button 
                                    @click="applyFilters" 
                                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>Показать результаты</span>
                                    <span 
                                        v-if="activeFiltersCount() > 0" 
                                        class="bg-blue-500 text-white text-xs rounded-full px-2 py-1"
                                    >
                                        {{ activeFiltersCount() }}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Основная область с товарами -->
                <div class="lg:w-3/4">
                    <div class="bg-white rounded-lg shadow-sm p-5 mb-6">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h1 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Каталог товаров</h1>
                            <div class="text-sm text-gray-500">
                                Найдено товаров: {{ products.length }}
                            </div>
                        </div>
                    </div>

                    <!-- Список товаров -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ProductCard v-for="product in products" :key="product.id" :product="product" @add-to-cart="addToCart" />
                    </div>

                    <!-- Пагинация -->
                    <div class="mt-10 flex justify-center">
                        <nav class="inline-flex rounded-md shadow-sm">
                            <button @click="goToPage(page - 1)" :disabled="page === 1" class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
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
                            <button @click="goToPage(page + 1)" :disabled="page === totalPages" class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                <ArrowRightIcon class="size-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.no-spinner {
    -moz-appearance: textfield;
}

/* Плавная анимация для мобильных фильтров */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>