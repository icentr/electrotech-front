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
const priceMin = ref(null);
const priceMax = ref(null);
const filters = ref([]);
const categories = ref([]);

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
                            count: 0, // Можете заменить, если API возвращает count
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
                } else {
                    // Можно сохранить числовые фильтры, если нужно
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

onMounted(async () => {
    await fetchFilters();
    await fetchProducts();
});
</script>

<template>
    <div class="pb-12">
        <div class="container mx-auto px-4">
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Боковая панель фильтров -->
                <aside class="lg:w-1/4">
                    <div class="bg-white rounded-lg shadow-sm p-5 sticky top-4">
                        <h2 class="text-lg font-bold text-gray-900 mb-5">Фильтры</h2>

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
                            <ul v-if="filter.type == 'list'" class="space-y-2">
                                <li v-for="option in filter.options" :key="option.id">
                                    <label class="text-gray-600 hover:text-blue-600 text-sm flex items-center cursor-pointer">
                                        <input type="checkbox" class="mr-2" :value="option.name" v-model="option.selected" />
                                        {{ option.name }} ({{ option.count }})
                                    </label>
                                </li>
                            </ul>
                            <div v-if="filter.type == 'number'" class="flex gap-2">
                                <input type="number" placeholder="От" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm no-spinner" v-model.number="filter.inputMin" />
                                <span class="text-gray-400">—</span>
                                <input type="number" placeholder="До" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm no-spinner" v-model.number="filter.inputMax" />
                            </div>
                        </div>

                        <button @click="applyFilters" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">Применить фильтры</button>
                    </div>
                </aside>

                <!-- Основная область с товарами -->
                <div class="lg:w-3/4">
                    <div class="bg-white rounded-lg shadow-sm p-5 mb-6">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h1 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Каталог товаров</h1>
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
