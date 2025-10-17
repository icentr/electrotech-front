<template>
    <div class="container mx-auto px-4 py-8">
        <Breadcrumbs :page="order ? 'Заказ №' + order.id : 'Неизвестный заказ'" />
        <div v-if="order">
            <h1 class="text-2xl font-bold mb-4">Заказ №{{ order.id }}</h1>
            <p class="mb-2"><strong>Дата:</strong> {{ formatDate(order.date) }}</p>

            <h2 class="text-xl font-semibold mt-6 mb-4">Товары</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="(product, index) in order.products"
                    :key="index"
                    class="relative group bg-white rounded-xl shadow-sm p-5 transition-all duration-300 hover:shadow-md hover:border-blue-600 hover:border hover:-translate-y-1 border border-transparent h-full flex flex-col">
                    <!-- Изображение -->
                    <div class="relative mb-4 pt-[70%] bg-gray-100 rounded-lg overflow-hidden">
                        <img :src="getImageUrl(product.imagePath)" :alt="product.productName" class="absolute top-0 left-0 w-full h-full object-contain p-4" />

                        <div v-if="product.badge" class="absolute top-3 left-3 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                            {{ product.badge }}
                        </div>
                    </div>

                    <!-- Информация -->
                    <div class="flex-grow">
                        <NuxtLink :to="`/product/${product.productId}`" class="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 block mb-1">
                            {{ product.productName }}
                        </NuxtLink>

                        <!-- если есть производитель -->
                        <div v-if="product.manufacturer" class="flex items-center mb-4">
                            <span class="text-gray-700 font-semibold text-sm">{{ product.manufacturer }}</span>
                        </div>

                        <div v-if="product.description" class="text-gray-600 text-sm mb-4 line-clamp-2">
                            {{ product.description }}
                        </div>
                    </div>

                    <!-- Цена + количество -->
                    <div class="mt-auto">
                        <div class="flex justify-between items-center mb-4">
                            <div>
                                <div class="text-gray-900 font-bold text-xl">
                                    {{ formatCurrency(product.price) }}
                                </div>
                                <div v-if="product.oldPrice" class="text-gray-400 text-sm line-through">
                                    {{ formatCurrency(product.oldPrice) }}
                                </div>
                            </div>
                            <div v-if="product.quantity > 0" class="text-gray-500 text-sm font-medium flex items-center">
                                <CheckCircleIcon class="size-4 mr-1" />
                                Количество ({{ product.quantity }})
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-right text-xl font-bold mt-8">Итого: {{ formatCurrency(orderTotal) }}</div>
        </div>
        <div v-else-if="loading" class="text-center py-12 text-gray-500">
            Загрузка
            <div class="flex items-center justify-center">
                <ArrowPathIcon class="size-10 mr-2 animate-spin" />
            </div>
        </div>
        <div v-else class="text-center py-12 text-gray-500">
            <div class="font-mono text-3xl text-orange-500">404</div>
            Нет такого заказа
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { getImageUrl } from "~/api";
import { getApi } from "@/api";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/vue/16/solid";

const loading = ref(true);

const api = getApi();

const route = useRoute();
const order = ref(null);

onMounted(async () => {
    try {
        const { data } = await api.get("/orders/get");

        loading.value = false;
        const orders = data.orders;
        const id = Number(route.params.id);

        const found = orders.find((o) => o.id === id);
        if (found) {
            const rawDate = found.createdAt;
            const isoDate = rawDate.split(" ")[0] + "T" + rawDate.split(" ")[1];

            // Просто присваиваем без преобразований
            order.value = {
                ...found,
                date: isoDate,
            };
        }
    } catch (err) {
        console.error("Ошибка при загрузке заказа:", err);
    }
});

const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("ru-RU", options);
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
    }).format(value);
};

const orderTotal = computed(() => {
    if (!order.value) return 0;
    return order.value.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
});

watch(order, (val) => {
    if (val) {
        useHead({
            title: `Заказ №${val.id}`,
        });
    }
});
</script>
