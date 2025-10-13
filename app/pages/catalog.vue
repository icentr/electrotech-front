<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import { useCartStore } from "../stores/cart";
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon, FunnelIcon, ChevronDownIcon } from "@heroicons/vue/16/solid";
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

// Реактивные переменные для управления фильтрами
const isFiltersOpen = ref(false);
const activeFilterSection = ref(null);
const desktopExpandedFilters = ref(new Set()); // Для хранения открытых фильтров на десктопе

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

// Функции для управления фильтрами
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

const toggleDesktopFilter = (filterName) => {
    if (desktopExpandedFilters.value.has(filterName)) {
        desktopExpandedFilters.value.delete(filterName);
    } else {
        desktopExpandedFilters.value.add(filterName);
    }
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

// Получить количество выбранных опций для фильтра
const getSelectedOptionsCount = (filter) => {
    if (filter.type === 'list') {
        return filter.options.filter(option => option.selected).length;
    }
    return 0;
};

// Получить текст для кнопки фильтра на десктопе
const getFilterButtonText = (filter) => {
    const baseText = filter.name;
    const selectedCount = getSelectedOptionsCount(filter);
    
    if (selectedCount > 0) {
        return `${baseText} (${selectedCount})`;
    }
    
    return baseText;
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
                <!-- Боковая панель фильтров для десктопа - компактная версия -->
                <aside class="hidden lg:block lg:w-64">
                    <div class="bg-white rounded-lg shadow-sm p-5 sticky top-4">
                        <div class="flex items-center justify-between mb-5">
                            <h2 class="text-lg font-bold text-gray-900">Фильтры</h2>
                            <button 
                                v-if="activeFiltersCount() > 0"
                                @click="clearAllFilters" 
                                class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Сбросить
                            </button>
                        </div>

                        <!-- Компактные выпадающие фильтры -->
                        <div class="space-y-2">
                            <div v-for="filter in filters" :key="filter.name" class="border border-gray-200 rounded-lg">
                                <!-- Кнопка для раскрытия фильтра -->
                                <button 
                                    @click="toggleDesktopFilter(filter.name)"
                                    class="w-full p-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-lg"
                                >
                                    <div class="flex items-center gap-2">
                                        <span class="font-medium text-gray-900 text-sm">
                                            {{ getFilterButtonText(filter) }}
                                        </span>
                                    </div>
                                    <ChevronDownIcon 
                                        class="size-4 text-gray-400 transition-transform duration-200"
                                        :class="{ 'rotate-180': desktopExpandedFilters.has(filter.name) }"
                                    />
                                </button>

                                <!-- Контент фильтра -->
                                <div 
                                    v-if="desktopExpandedFilters.has(filter.name)"
                                    class="px-3 pb-3 border-t border-gray-100"
                                >
                                    <!-- Список опций -->
                                    <ul v-if="filter.type == 'list'" class="space-y-2 mt-3 max-h-60 overflow-y-auto">
                                        <li v-for="option in filter.options" :key="option.id">
                                            <label class="text-gray-600 hover:text-blue-600 text-sm flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                                                    :value="option.name" 
                                                    v-model="option.selected" 
                                                />
                                                <span class="flex-1 truncate">{{ option.name }}</span>
                                                <span class="text-gray-400 text-xs ml-1">({{ option.count }})</span>
                                            </label>
                                        </li>
                                    </ul>

                                    <!-- Числовые поля -->
                                    <div v-if="filter.type == 'number'" class="space-y-2 mt-3">
                                        <div class="flex gap-2">
                                            <input 
                                                type="number" 
                                                placeholder="От" 
                                                class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm no-spinner" 
                                                v-model.number="filter.inputMin" 
                                            />
                                            <span class="text-gray-400 flex items-center text-sm">—</span>
                                            <input 
                                                type="number" 
                                                placeholder="До" 
                                                class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm no-spinner" 
                                                v-model.number="filter.inputMax" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button 
                            @click="applyFilters" 
                            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors mt-4 flex items-center justify-center gap-2"
                        >
                            <span>Применить</span>
                            <span 
                                v-if="activeFiltersCount() > 0" 
                                class="bg-blue-500 text-white text-xs rounded-full px-2 py-1"
                            >
                                {{ activeFiltersCount() }}
                            </span>
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
                                <div v-for="filter in filters" :key="filter.name" class="border-b border-gray-200">
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
                <div class="flex-1 min-w-0">
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

/* Стили для скроллбара в выпадающих списках */
.max-h-60::-webkit-scrollbar {
    width: 4px;
}

.max-h-60::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
}

.max-h-60::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>