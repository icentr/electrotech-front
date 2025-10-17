<!-- src/pages/product/[id].vue -->
<template>
    <Breadcrumbs :breadcrumbs="[{ name: 'Каталог', url: '/catalog' }]" :page="product?.name || 'Загрузка...'" />
    <div class="pb-12" v-if="product">
        <div class="container mx-auto px-4" v-if="product">
            <!-- Хлебные крошки -->

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Основная информация о товаре -->
                <div class="">
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div class="flex flex-col md:flex-row gap-6">
                            <!-- Изображение товара -->
                            <div class="md:w-1/3">
                                <div class="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                                    <img :src="getImageUrl(product.imagePath)" :alt="product.name" class="max-h-full object-contain w-full" />
                                </div>
                            </div>

                            <!-- Основные характеристики -->
                            <div class="md:w-2/3">
                                <h1 class="text-2xl font-bold text-gray-900 mb-2">
                                    {{ product.name }}
                                </h1>
                                <span class="text-sm text-gray-500">Артикул: {{ product.articleNumber }}</span>

                                <div class="flex items-center mb-4">
                                    <div class="flex text-yellow-400 mr-2">
                                        <StarIcon class="size-5" v-for="i in 5" :key="i" :class="{ 'text-gray-300': i > product.rating }" />
                                    </div>
                                </div>

                                <div class="mb-6">
                                    <div class="flex items-baseline mb-2">
                                        <span class="text-3xl font-bold text-gray-900 mr-3">{{ product.price }} ₽</span>

                                        <span v-if="product.oldPrice" class="text-lg text-gray-500 line-through">{{ product.oldPrice }} ₽</span>
                                        <span v-if="product.oldPrice" class="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded"
                                            >-{{ Math.round((1 - parseFloat(product.price.replace(/\s/g, "")) / parseFloat(product.oldPrice.replace(/\s/g, ""))) * 100) }}%</span
                                        >
                                    </div>

                                    <div class="text-green-600 text-sm font-medium" v-if="product.count > 0">В наличии ({{ product.count }} шт.)</div>
                                    <div class="text-gray-500 text-sm" v-else>Под заказ</div>
                                </div>

                                <!-- Кнопки действий -->
                                <div class="flex flex-col sm:flex-row gap-3">
                                    <button
                                        :disabled="product.count === 0"
                                        class="relative z-20 w-full bg-blue-600 disabled:bg-blue-200 disabled:text-blue-50 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                                        @click="addToCart">
                                        <ShoppingCartIcon class="size-5 mr-2" />
                                        В корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Подробное описание и характеристики -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">Описание товара</h2>
                        <p class="text-gray-700 mb-6">{{ product.description }}</p>

                        <h2 class="text-xl font-bold text-gray-900 mb-4">Технические характеристики</h2>
                        <div class="flex justify-between border-b border-gray-100 py-2" v-for="(param, index) in product.parameters" :key="index">
                            <span class="text-gray-600">{{ param.name }}</span>
                            <span class="text-gray-900 font-medium">
                                {{ param.stringValue || param.numberValue || (param.sliceValue ? param.sliceValue.join(", ") : "") }}
                            </span>
                        </div>
                        <div class="flex justify-between border-b border-gray-100 py-2">
                            <p class="text-gray-600">Производитель</p>
                            <p class="text-gray-900">{{ product.manufacturer }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getApi } from "@/api";

const api = getApi();
import { getImageUrl } from "@/api";
import { useCartStore } from "@/stores/cart";
import { ShoppingCartIcon, StarIcon } from "@heroicons/vue/16/solid";
// import { useToast } from "vue-toastification"; // если используешь уведомления

const route = useRoute();
const product = ref();
const loading = ref(true);
const error = ref(null);

const cartStore = useCartStore();
// const toast = useToast(); // если используешь уведомления

const fetchProduct = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        product.value = response.data.product;
    } catch (err) {
        console.error("Ошибка при загрузке товара:", err);
        error.value = "Не удалось загрузить данные товара.";
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchProduct(route.params.id);
});

const addToCart = () => {
    if (product.value) {
        cartStore.addToCart(product.value);
        // toast.success(`«${product.value.name}» добавлен в корзину`);
    }
};
const pageTitle = computed(() => product.value?.name || "Загрузка...");

useHead({
    title: pageTitle,
});
</script>
