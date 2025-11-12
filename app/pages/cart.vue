<script setup>
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
  CreditCardIcon,
} from "@heroicons/vue/16/solid";
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { getImageUrl } from "../api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

useHead({
  title: "Корзина",
});

const router = useRouter();
const auth = useAuthStore();

const cartStore = useCartStore();
const message = ref("");

const promoCode = ref("");

// Форматирование валюты
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
};

const handleCheckout = () => {
  if (!auth.token) {
    router.push("/login");
  } else {
    router.push("/checkout");
  }
};

// Методы корзины
const updateQuantity = (id, newQuantity) => {
  cartStore.updateQuantity(id, newQuantity);
};

const removeFromCart = (id) => {
  cartStore.removeFromCart(id);
};

const clearCart = () => {
  cartStore.clearCart();
  promoCode.value = "";
};

const applyPromoCode = () => {
  if (promoCode.value) {
    const success = cartStore.applyPromoCode(promoCode.value);
    message.value = success ? "Промокод применен!" : "Промокод недействителен";
  }
};

// Вычисляемые свойства
const subtotal = computed(() => cartStore.subtotal);
const discount = computed(() => cartStore.discount);
const total = computed(() => cartStore.total);
const totalItems = computed(() => cartStore.totalItems);
const cartItems = computed(() => cartStore.cartItems);
</script>

<template>
  <Breadcrumbs :page="'Корзина'" />
  <div class="pb-12">
    <div class="container mx-auto px-4">
      <h1 class="mb-6 text-2xl font-bold text-gray-900">Корзина</h1>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Основная часть - список товаров -->
        <div class="lg:col-span-2">
          <div class="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <!-- Заголовок таблицы -->
            <div
              class="mb-4 hidden grid-cols-12 gap-4 border-b border-gray-200 pb-3 md:grid"
            >
              <div class="col-span-6 text-sm font-medium text-gray-500">
                Товар
              </div>
              <div class="col-span-2 text-sm font-medium text-gray-500">
                Цена
              </div>
              <div class="col-span-2 text-sm font-medium text-gray-500">
                Количество
              </div>
              <div class="col-span-2 text-sm font-medium text-gray-500">
                Сумма
              </div>
            </div>

            <!-- Список товаров -->
            <div v-if="cartItems.length > 0">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex grid-cols-3 flex-col gap-4 border-b border-gray-100 py-4 md:grid md:grid-cols-12"
              >
                <!-- Изображение и название -->
                <div class="col-span-3 flex items-start md:col-span-6">
                  <div
                    class="mr-4 flex h-16 w-16 items-center justify-center rounded-md bg-gray-100"
                  >
                    <img
                      :src="item.imagePath"
                      :alt="item.name"
                      class="max-h-full"
                    />
                  </div>
                  <div>
                    <RouterLink
                      :to="`/product/${item.id}`"
                      class="text-sm font-medium text-gray-900 hover:text-blue-600"
                      >{{ item.name }}</RouterLink
                    >
                    <p class="mt-1 text-xs text-gray-500">
                      Код: {{ item.code }}
                    </p>
                    <button
                      class="mt-2 flex items-center text-red-600 hover:text-red-800 md:text-sm"
                      @click="removeFromCart(item.id)"
                    >
                      <TrashIcon class="mr-1 size-4" />
                      Удалить
                    </button>
                  </div>
                </div>

                <!-- Цена -->
                <div class="col-span-1 flex items-baseline gap-2 md:col-span-2">
                  <div class="mb-1 text-gray-500 md:hidden">Цена</div>
                  <div class="text-md">
                    {{ formatCurrency(item.price) }}
                  </div>
                </div>

                <!-- Количество -->
                <div class="col-span-1 flex items-baseline gap-2 md:col-span-2">
                  <div class="mb-1 text-gray-500 md:hidden">Кол-во</div>
                  <div
                    class="flex items-center rounded-md border border-gray-300"
                  >
                    <button
                      class="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      :disabled="item.quantity <= 1"
                    >
                      <MinusIcon class="size-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      class="no-spinner w-10 border-x border-gray-300 py-1 ps-3 text-start text-sm"
                      v-model.number="item.quantity"
                      @change="updateQuantity(item.id, item.quantity)"
                    />
                    <button
                      class="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                    >
                      <PlusIcon class="size-4" />
                    </button>
                  </div>
                </div>

                <!-- Сумма -->
                <div class="col-span-1 flex items-baseline gap-2 md:col-span-2">
                  <div class="mb-1 text-gray-500 md:hidden">Сумма</div>
                  <div class="">
                    {{ formatCurrency(item.price * item.quantity) }}
                  </div>
                </div>
              </div>

              <!-- Промокод -->
              <div
                class="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
              >
                <form
                  class="flex flex-1 items-center"
                  @submit.prevent="applyPromoCode"
                >
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    class="focus:border-accent focus:ring-accent w-full rounded-l-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
                    v-model="promoCode"
                  />
                  <button
                    class="bg-accent hover:bg-accent/90 rounded-r-md px-4 py-2 text-sm font-medium text-white transition-colors"
                  >
                    Применить
                  </button>
                </form>
                <button
                  class="flex items-center text-sm font-medium text-red-600 hover:text-red-800"
                  @click="clearCart"
                >
                  <TrashIcon class="mr-2 size-4" />
                  Очистить корзину
                </button>
              </div>
              <p
                v-if="message"
                :class="
                  message === 'Промокод недействителен'
                    ? 'text-red-600'
                    : 'text-green-600'
                "
                class="mt-2 text-sm"
              >
                {{ message }}
              </p>
            </div>

            <!-- Пустая корзина -->
            <div v-else class="py-12 text-center">
              <div
                class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
              >
                <ShoppingCartIcon class="size-6 text-gray-400" />
              </div>
              <h3 class="mb-2 text-lg font-medium text-gray-900">
                Ваша корзина пуста
              </h3>
              <p class="mb-6 text-gray-500">
                Добавьте товары из каталога, чтобы продолжить
              </p>
              <RouterLink
                to="/catalog"
                class="bg-accent inline-flex items-center rounded-md px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <ArrowLeftIcon class="mr-2 size-4" />
                Перейти в каталог
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Боковая панель - итоги -->
        <div class="lg:col-span-1">
          <div
            class="sticky top-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h2 class="mb-4 text-lg font-bold text-gray-900">Ваш заказ</h2>

            <div class="mb-6 space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Товары ({{ totalItems }})</span>
                <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Скидка</span>
                <span class="font-medium text-red-600"
                  >-{{ formatCurrency(discount) }}</span
                >
              </div>
            </div>

            <div class="mb-6 border-t border-gray-200 pt-4">
              <div class="flex justify-between text-lg font-bold text-gray-900">
                <span>Итого</span>
                <span>{{ formatCurrency(total) }}</span>
              </div>
            </div>

            <button
              v-if="cartItems.length > 0"
              @click="handleCheckout"
              class="bg-accent hover:bg-accent/70 flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-medium text-white transition-colors"
            >
              <CreditCardIcon class="mr-2 size-4" /> Оформить заказ
            </button>

            <div class="mt-4 text-xs text-gray-500">
              Нажимая на кнопку, вы соглашаетесь с
              <a href="#" class="text-accent/80 hover:underline"
                >условиями обработки персональных данных</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
