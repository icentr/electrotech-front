<template>
  <div
    class="group hover:border-accent relative flex h-full flex-col rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border hover:shadow-md"
  >
    <!-- Слой-ссылка -->
    <!-- Содержимое карточки -->
    <div class="relative z-10 flex h-full flex-col">
      <!-- Изображение -->
      <div
        class="relative mb-4 overflow-hidden rounded-lg bg-gray-200 text-right"
      >
        <img
          :src="getImageUrl(product.imagePath)"
          :alt="product.name"
          loading="lazy"
          class="top-0 right-0 aspect-square w-full object-cover"
        />
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
              {{ formatCurrency(product.price, product.currency) }}
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

        <div v-if="cart.isInCart(product)" class="flex gap-2">
          <input type="number" v-model="quantity" class="entry" />
          <button
            class="btn btn-accent-outline btn-sm px-3"
            @click="quantity--"
          >
            <MinusIcon class="size-6" />
          </button>
          <button class="btn btn-accent btn-sm" @click="quantity++">
            <PlusIcon class="size-6" />
          </button>
        </div>

        <button
          v-else
          :disabled="product.count == 0"
          class="btn btn-accent"
          @click="addToCart"
        >
          <ShoppingCartIcon class="mr-2 size-5" />
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  ClockIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/16/solid";
import { getImageUrl, formatCurrency } from "@/utils";
import type { Product } from "~/models";

import { useCartStore } from "@/stores/cart";

const props = defineProps<{ product: Product }>();
const cart = useCartStore();

const cartItem = cart.cartItems.find((item) => item.id === props.product.id);

const quantity = ref(cartItem?.quantity || 1);
watch(quantity, (newValue) => {
  cart.updateQuantity(props.product.id, newValue);
  if (newValue <= 0) {
    cart.removeFromCart(props.product.id);
    quantity.value = 1;
    return;
  }

  quantity.value = newValue;
});

const addToCart = () => {
  cart.addToCart(props.product);
};
</script>
