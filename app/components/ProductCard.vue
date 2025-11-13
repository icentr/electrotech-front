<template>
  <div
    class="group hover:border-accent relative flex h-full flex-col rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border hover:shadow-md"
  >
    <!-- Слой-ссылка -->
    <!-- Содержимое карточки -->
    <div class="relative z-10 flex h-full flex-col">
      <!-- Изображение -->
      <div class="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
        <img
          :src="getImageUrl(product.imagePath)"
          :alt="product.name"
          loading="lazy"
          class="top-0 left-0 aspect-square w-full object-contain"
        />
        <div
          v-if="product.badge"
          class="absolute top-3 left-3 rounded bg-yellow-400 px-2 py-1 text-xs font-bold text-yellow-800"
        >
          {{ product.badge }}
        </div>
      </div>

      <!-- Информация -->
      <div class="grow">
        <NuxtLink
          :to="`/product/${product.id}`"
          class="hover:text-accent mb-2 line-clamp-2 block text-lg font-bold text-gray-900 transition-colors"
        >
          {{ product.name }}
        </NuxtLink>

        <div class="mb-4 line-clamp-3 text-sm text-gray-600">
          {{ product.description }}
        </div>
      </div>

      <!-- Цена + кнопка -->
      <div class="mt-auto">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <div class="text-xl font-bold text-gray-900">
              {{ product.price }} ₽
            </div>
            <div
              v-if="product.oldPrice"
              class="text-sm text-gray-400 line-through"
            >
              {{ product.oldPrice }} ₽
            </div>
          </div>
          <div
            v-if="product.count > 0"
            class="flex gap-1 text-sm font-medium text-green-600"
          >
            <CheckCircleIcon class="size-5 text-green-600" />
            В наличии ({{ product.count }})
          </div>
          <div v-else class="flex gap-1 text-sm text-gray-500">
            <ClockIcon class="size-5 text-gray-500" />
            Под заказ
          </div>
        </div>

        <button
          :disabled="product.count == 0"
          class="btn btn-accent"
          @click.stop="$emit('add-to-cart', product)"
        >
          <ShoppingCartIcon class="mr-2 size-5" />
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CheckCircleIcon,
  ClockIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/16/solid";
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
