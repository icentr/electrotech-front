<script setup>
import { ref, onMounted, computed } from "vue";
import ProductCard from "../components/ProductCard.vue";
import { useCartStore } from "../stores/cart";
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon, FunnelIcon, ChevronDownIcon, AdjustmentsHorizontalIcon } from "@heroicons/vue/16/solid";
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
const desktopExpandedFilters = ref(new Set());

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
                    return;
                }
                filtersPayload.push({
                    parameter: f.name,
                    type: f.type,
                    min: f.inputMin,
                    max: f.inputMax,
                });
            }
        });

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
    isFiltersOpen.value = false;
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

// Подсчет активных фильтров
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

// Получить список активных фильтров с названиями
const activeFiltersList = computed(() => {
    const activeFilters = [];
    
    filters.value.forEach(filter => {
        if (filter.type === 'list') {
            const selectedOptions = filter.options.filter(option => option.selected);
            selectedOptions.forEach(option => {
                activeFilters.push({
                    filterName: filter.name,
                    optionName: option.name,
                    type: 'list'
                });
            });
        } else if (filter.type === 'number') {
            if (filter.inputMin !== filter.min || filter.inputMax !== filter.max) {
                activeFilters.push({
                    filterName: filter.name,
                    min: filter.inputMin,
                    max: filter.inputMax,
                    type: 'number'
                });
            }
        }
    });
    
    return activeFilters;
});

// Удалить конкретный фильтр
const removeFilter = (filterToRemove) => {
    if (filterToRemove.type === 'list') {
        const filter = filters.value.find(f => f.name === filterToRemove.filterName);
        if (filter) {
            const option = filter.options.find(o => o.name === filterToRemove.optionName);
            if (option) {
                option.selected = false;
            }
        }
    } else if (filterToRemove.type === 'number') {
        const filter = filters.value.find(f => f.name === filterToRemove.filterName);
        if (filter) {
            filter.inputMin = filter.min;
            filter.inputMax = filter.max;
        }
    }
};

// Получить текст для числового фильтра
const getNumberFilterText = (filter) => {
    if (filter.inputMin === filter.min && filter.inputMax === filter.max) {
        return `${filter.name}: все значения`;
    }
    if (filter.inputMin === filter.min) {
        return `${filter.name}: до ${filter.inputMax}`;
    }
    if (filter.inputMax === filter.max) {
        return `${filter.name}: от ${filter.inputMin}`;
    }
    return `${filter.name}: ${filter.inputMin} - ${filter.inputMax}`;
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
                    class="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-between text-gray-900 hover:bg-gray-50 transition-colors border border-gray-200"
                >
                    <div class="flex items-center gap-2">
                        <AdjustmentsHorizontalIcon class="size-5 text-blue-600" />
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
                <aside class="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0">
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                        <!-- Заголовок с иконкой -->
                        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-blue-50 rounded-lg">
                                    <AdjustmentsHorizontalIcon class="size-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 class="text-xl font-bold text-gray-900">Фильтры</h2>
                                    <p class="text-sm text-gray-500 mt-1">Уточните параметры поиска</p>
                                </div>
                            </div>
                            <button 
                                v-if="activeFiltersCount() > 0"
                                @click="clearAllFilters" 
                                class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors px-3 py-1 rounded-lg hover:bg-blue-50"
                            >
                                Сбросить все
                            </button>
                        </div>

                        <!-- Блок активных фильтров -->
                        <div v-if="activeFiltersCount() > 0" class="mb-6">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-sm font-medium text-gray-700">Активные фильтры:</span>
                                <span class="bg-blue-600 text-white text-xs rounded-full px-2 py-1 font-medium">
                                    {{ activeFiltersCount() }}
                                </span>
                            </div>
                            
                            <!-- Список активных фильтров -->
                            <div class="space-y-2">
                                <div 
                                    v-for="(activeFilter, index) in activeFiltersList" 
                                    :key="index"
                                    class="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-3 py-2"
                                >
                                    <div class="flex items-center gap-2 flex-1 min-w-0">
                                        <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                        <span class="text-sm text-blue-800 truncate">
                                            <template v-if="activeFilter.type === 'list'">
                                                {{ activeFilter.filterName }}: {{ activeFilter.optionName }}
                                            </template>
                                            <template v-else-if="activeFilter.type === 'number'">
                                                {{ getNumberFilterText(filters.find(f => f.name === activeFilter.filterName)) }}
                                            </template>
                                        </span>
                                    </div>
                                    <button 
                                        @click="removeFilter(activeFilter)"
                                        class="ml-2 flex-shrink-0 text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors"
                                    >
                                        <XMarkIcon class="size-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Широкие выпадающие фильтры -->
                        <div class="space-y-3">
                            <div v-for="filter in filters" :key="filter.name" class="border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                                <!-- Кнопка для раскрытия фильтра -->
                                <button 
                                    @click="toggleDesktopFilter(filter.name)"
                                    class="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all duration-200 rounded-xl"
                                >
                                    <div class="flex items-center gap-3">
                                        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span class="font-semibold text-gray-900 text-base">
                                            {{ filter.name }}
                                            <span v-if="filter.type === 'list' && filter.options.filter(o => o.selected).length > 0" class="text-blue-600 ml-1">
                                                ({{ filter.options.filter(o => o.selected).length }})
                                            </span>
                                        </span>
                                    </div>
                                    <ChevronDownIcon 
                                        class="size-5 text-gray-400 transition-transform duration-300"
                                        :class="{ 'rotate-180': desktopExpandedFilters.has(filter.name) }"
                                    />
                                </button>

                                <!-- Контент фильтра -->
                                <div 
                                    v-if="desktopExpandedFilters.has(filter.name)"
                                    class="px-4 pb-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl"
                                >
                                    <!-- Список опций -->
                                    <div v-if="filter.type == 'list'" class="mt-4">
                                        <div class="max-h-72 overflow-y-auto custom-scrollbar pr-2">
                                            <div class="space-y-3">
                                                <label 
                                                    v-for="option in filter.options" 
                                                    :key="option.id"
                                                    class="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200"
                                                    :class="{ 'bg-white shadow-sm border-gray-200': option.selected }"
                                                >
                                                    <input 
                                                        type="checkbox" 
                                                        class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-5" 
                                                        :value="option.name" 
                                                        v-model="option.selected" 
                                                    />
                                                    <span class="flex-1 text-gray-700 font-medium text-sm">{{ option.name }}</span>
                                                    <span class="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded-full min-w-8 text-center">
                                                        {{ option.count }}
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Числовые поля -->
                                    <div v-if="filter.type == 'number'" class="mt-4 space-y-4">
                                        <div class="flex gap-3">
                                            <div class="flex-1">
                                                <label class="block text-xs font-medium text-gray-500 mb-2">От</label>
                                                <input 
                                                    type="number" 
                                                    :placeholder="filter.min" 
                                                    class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base no-spinner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                                    v-model.number="filter.inputMin" 
                                                />
                                            </div>
                                            <div class="flex-1">
                                                <label class="block text-xs font-medium text-gray-500 mb-2">До</label>
                                                <input 
                                                    type="number" 
                                                    :placeholder="filter.max" 
                                                    class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base no-spinner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                                    v-model.number="filter.inputMax" 
                                                />
                                            </div>
                                        </div>
                                        <!-- Диапазон значений -->
                                        <div class="text-xs text-gray-500 text-center">
                                            Диапазон: {{ filter.min }} - {{ filter.max }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Кнопка применения -->
                        <button 
                            @click="applyFilters" 
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl text-base font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md mt-6 flex items-center justify-center gap-3 group"
                        >
                            <AdjustmentsHorizontalIcon class="size-5 text-white group-hover:scale-110 transition-transform" />
                            <span>Применить фильтры</span>
                            <span 
                                v-if="activeFiltersCount() > 0" 
                                class="bg-white text-blue-600 text-xs rounded-full px-2 py-1 font-bold min-w-6"
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
                    <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
                        <div class="flex flex-col h-full">
                            <!-- Заголовок -->
                            <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                                <div class="flex items-center gap-3">
                                    <AdjustmentsHorizontalIcon class="size-6 text-blue-600" />
                                    <div>
                                        <h2 class="text-xl font-bold text-gray-900">Фильтры</h2>
                                        <p class="text-sm text-gray-500">Настройте параметры</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button 
                                        v-if="activeFiltersCount() > 0"
                                        @click="clearAllFilters" 
                                        class="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50"
                                    >
                                        Сбросить все
                                    </button>
                                    <button @click="closeFilters" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <XMarkIcon class="size-6" />
                                    </button>
                                </div>
                            </div>

                            <!-- Блок активных фильтров для мобильной версии -->
                            <div v-if="activeFiltersCount() > 0" class="mx-6 mt-4">
                                <div class="flex items-center justify-between mb-3">
                                    <span class="text-sm font-medium text-gray-700">Активные фильтры:</span>
                                    <span class="bg-blue-600 text-white text-xs rounded-full px-2 py-1 font-medium">
                                        {{ activeFiltersCount() }}
                                    </span>
                                </div>
                                
                                <!-- Список активных фильтров -->
                                <div class="space-y-2 mb-4">
                                    <div 
                                        v-for="(activeFilter, index) in activeFiltersList" 
                                        :key="index"
                                        class="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-3 py-2"
                                    >
                                        <div class="flex items-center gap-2 flex-1 min-w-0">
                                            <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                            <span class="text-sm text-blue-800 truncate">
                                                <template v-if="activeFilter.type === 'list'">
                                                    {{ activeFilter.filterName }}: {{ activeFilter.optionName }}
                                                </template>
                                                <template v-else-if="activeFilter.type === 'number'">
                                                    {{ getNumberFilterText(filters.find(f => f.name === activeFilter.filterName)) }}
                                                </template>
                                            </span>
                                        </div>
                                        <button 
                                            @click="removeFilter(activeFilter)"
                                            class="ml-2 flex-shrink-0 text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors"
                                        >
                                            <XMarkIcon class="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Список фильтров -->
                            <div class="flex-1 overflow-y-auto py-4">
                                <div v-for="filter in filters" :key="filter.name" class="mx-6 mb-4 border border-gray-200 rounded-xl">
                                    <!-- Заголовок секции фильтра -->
                                    <button 
                                        @click="toggleFilterSection(filter.name)"
                                        class="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-xl"
                                    >
                                        <div class="flex items-center gap-3">
                                            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span class="font-semibold text-gray-900">{{ filter.name }}</span>
                                            <span 
                                                v-if="filter.type === 'list' && filter.options.filter(o => o.selected).length > 0"
                                                class="bg-blue-600 text-white text-xs rounded-full px-2 py-1 font-medium"
                                            >
                                                {{ filter.options.filter(o => o.selected).length }}
                                            </span>
                                        </div>
                                        <svg 
                                            class="size-5 text-gray-400 transition-transform duration-300" 
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
                                        class="px-4 pb-4 bg-gray-50/50 rounded-b-xl"
                                    >
                                        <!-- Список опций -->
                                        <div v-if="filter.type == 'list'" class="mt-3">
                                            <div class="max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                                <div class="space-y-2">
                                                    <label 
                                                        v-for="option in filter.options" 
                                                        :key="option.id"
                                                        class="flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-white border border-transparent hover:border-gray-200"
                                                        :class="{ 'bg-white border-gray-200': option.selected }"
                                                    >
                                                        <input 
                                                            type="checkbox" 
                                                            class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-5" 
                                                            :value="option.name" 
                                                            v-model="option.selected" 
                                                        />
                                                        <span class="flex-1 text-gray-700 font-medium">{{ option.name }}</span>
                                                        <span class="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                            {{ option.count }}
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Числовые поля -->
                                        <div v-if="filter.type == 'number'" class="mt-3 space-y-3">
                                            <div class="flex gap-3">
                                                <div class="flex-1">
                                                    <label class="block text-xs font-medium text-gray-500 mb-2">От</label>
                                                    <input 
                                                        type="number" 
                                                        :placeholder="filter.min" 
                                                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-base no-spinner" 
                                                        v-model.number="filter.inputMin" 
                                                    />
                                                </div>
                                                <div class="flex-1">
                                                    <label class="block text-xs font-medium text-gray-500 mb-2">До</label>
                                                    <input 
                                                        type="number" 
                                                        :placeholder="filter.max" 
                                                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-base no-spinner" 
                                                        v-model.number="filter.inputMax" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Кнопка применения -->
                            <div class="p-6 pb-8 border-t border-gray-200 bg-white">
                                <button 
                                    @click="applyFilters" 
                                    class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl text-base font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm flex items-center justify-center gap-3"
                                >
                                    <AdjustmentsHorizontalIcon class="size-5 text-white" />
                                    <span>Показать результаты</span>
                                    <span 
                                        v-if="activeFiltersCount() > 0" 
                                        class="bg-white text-blue-600 text-xs rounded-full px-2 py-1 font-bold min-w-6"
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
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900 mb-2">Каталог товаров</h1>
                                <p class="text-gray-500">Подборка товаров по вашим критериям</p>
                            </div>
                            <div class="mt-4 md:mt-0 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                                Найдено товаров: <span class="font-semibold text-gray-900">{{ products.length }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Список товаров -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ProductCard v-for="product in products" :key="product.id" :product="product" @add-to-cart="addToCart" />
                    </div>

                    <!-- Пагинация -->
                    <div class="mt-10 flex justify-center">
                        <nav class="inline-flex rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <button @click="goToPage(page - 1)" :disabled="page === 1" class="px-4 py-3 border-r border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <ArrowLeftIcon class="size-5" />
                            </button>
                            <button
                                v-for="n in totalPages"
                                :key="n"
                                @click="goToPage(n)"
                                class="px-5 py-3 border-r border-gray-200 last:border-r-0 transition-colors"
                                :class="{
                                    'bg-white text-gray-500 hover:bg-gray-50': n !== page,
                                    'bg-blue-50 text-blue-600 font-semibold border-blue-200': n === page,
                                }">
                                {{ n }}
                            </button>
                            <button @click="goToPage(page + 1)" :disabled="page === totalPages" class="px-4 py-3 border-l border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
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

/* Улучшенные стили для скроллбара */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f8fafc;
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>