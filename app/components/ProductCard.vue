<template>
    <NuxtLink
        :to="`/product/${product.id}`"
        class="relative group bg-white rounded-xl shadow-sm p-5 transition-all duration-300 hover:shadow-md hover:border-blue-600 hover:border hover:-translate-y-1 border border-transparent h-full flex flex-col">
        <!-- Слой-ссылка -->
        <!-- Содержимое карточки -->
        <div class="relative z-10 flex flex-col h-full">
            <!-- Изображение -->
            <div class="relative mb-4 pt-[70%] bg-gray-100 rounded-lg overflow-hidden">
                <img :src="getImageUrl(product.imagePath)" :alt="product.name" class="absolute top-0 left-0 w-full h-full object-contain p-4" />
                <div v-if="product.badge" class="absolute top-3 left-3 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                    {{ product.badge }}
                </div>
            </div>

            <!-- Информация -->
            <div class="flex-grow">
                <div class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 block mb-2">
                    {{ product.name }}
                </div>

                <div class="flex items-center mb-3">
                    <div class="flex text-yellow-400 mr-2">
                        <i class="fas fa-star" v-for="i in 5" :key="i" :class="{ 'text-gray-300': i > product.rating }"></i>
                    </div>
                    <span class="text-gray-500 text-sm">({{ product.reviews }})</span>
                </div>

                <div class="text-gray-600 text-sm mb-4 line-clamp-2">
                    {{ product.description }}
                </div>
            </div>

            <!-- Цена + кнопка -->
            <div class="mt-auto">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <div class="text-gray-900 font-bold text-xl">{{ product.price }} ₽</div>
                        <div v-if="product.oldPrice" class="text-gray-400 text-sm line-through">{{ product.oldPrice }} ₽</div>
                    </div>
                    <div v-if="product.inStock" class="text-green-600 text-sm font-medium"><i class="fas fa-check-circle mr-1"></i> В наличии</div>
                    <div v-else class="text-gray-500 text-sm"><i class="fas fa-clock mr-1"></i> Под заказ</div>
                </div>

                <button
                    class="relative z-20 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    @click.stop="$emit('add-to-cart', product)">
                    <i class="fas fa-shopping-cart mr-2"></i>
                    В корзину
                </button>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { getImageUrl } from "~/api";

defineProps({
    product: {
        type: Object,
        required: true,
    },
});

defineEmits(["add-to-cart"]);
</script>
