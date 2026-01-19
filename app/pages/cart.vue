<script setup lang="ts">
import { DOCS } from "~/data";
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
  CreditCardIcon,
} from "@heroicons/vue/16/solid";
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { formatCurrency } from "@/utils";

usePageTitle("Корзина");

const router = useRouter();
const auth = useAuthStore();

const cartStore = useCartStore();
const message = ref("");

const promoCode = ref("");

const handleCheckout = () => {
  if (!auth.token) {
    router.push("/login");
  } else {
    router.push("/checkout");
  }
};

const REMOVE_ON_DRAIN = true;

// Методы корзины
const updateQuantity = (item: CartItem, newQuantity: number) => {
  if (newQuantity > item.count) {
    cartStore.updateQuantity(item.id, item.count);
    return;
  }
  if (newQuantity < 1) {
    if (REMOVE_ON_DRAIN) cartStore.removeFromCart(item.id);
    else cartStore.updateQuantity(item.id, 1);
    return;
  }
  cartStore.updateQuantity(item.id, newQuantity);
};

const removeFromCart = (id: string) => {
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
  <BreadcrumbsBlock page="Корзина" />
  <div class="pb-12">
    <div class="container mx-auto px-4">
      <h1 class="mb-6 text-2xl font-bold text-gray-900">Корзина</h1>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Основная часть - список товаров -->
        <div class="lg:col-span-2">
          <div class="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <!-- Список товаров -->
            <div v-if="cartItems.length > 0">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex flex-col justify-between gap-4 border-b border-gray-100 py-4 md:flex-row md:items-center"
              >
                <!-- Изображение и название -->
                <div class="flex flex-col gap-3 md:w-1/2">
                  <div>
                    <RouterLink
                      :to="`/product/${item.id}`"
                      class="hover:text-accent pb-2 font-bold text-gray-900"
                      >{{ item.name }}</RouterLink
                    >
                  </div>
                  <div class="flex grow flex-row items-end justify-between">
                    <div
                      class="mr-4 flex h-16 w-16 items-center justify-center rounded-md bg-gray-100"
                    >
                      <img
                        :src="item.imagePath"
                        :alt="item.name"
                        class="max-h-full"
                      />
                    </div>
                    <div class="flex items-end justify-end gap-2">
                      <div class="text-gray-500">Цена</div>
                      <div class="">
                        {{ formatCurrency(item.price, item.currency) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Цена -->

                <!-- Количество -->
                <div class="flex flex-row gap-4">
                  <div
                    class="col-span-1 flex items-baseline gap-2 md:col-span-2"
                  >
                    <div class="text-l flex h-10 max-w-35 items-stretch">
                      <button
                        class="base-btn btn-accent-outline w-10 rounded-l-md border border-gray-300 px-2"
                        @click="updateQuantity(item, item.quantity - 1)"
                        :disabled="item.quantity <= 1"
                      >
                        <MinusIcon class="size-5" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        :max="item.count"
                        class="entry-base w-15 border-y border-gray-300 py-1 ps-3 text-center text-sm"
                        v-model.number="item.quantity"
                        @change="updateQuantity(item, item.quantity)"
                      />
                      <button
                        class="base-btn btn-accent-outline w-10 rounded-r-md border border-gray-300 px-2 text-gray-600 hover:bg-gray-100"
                        @click="updateQuantity(item, item.quantity + 1)"
                      >
                        <PlusIcon class="size-5" />
                      </button>
                    </div>
                  </div>

                  <!-- Сумма -->
                  <div class="flex w-20 grow items-baseline justify-end gap-2">
                    <div class="mb-1 text-gray-500 md:hidden">Сумма</div>
                    <div class="">
                      {{
                        formatCurrency(
                          item.price * item.quantity,
                          item.currency,
                        )
                      }}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    class="btn btn-destructive-outline"
                    title="Удалить из корзины"
                    @click="removeFromCart(item.id)"
                  >
                    <TrashIcon class="size-4" />

                    <span class="md:hidden">Удалить из корзины</span>
                  </button>
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
                    class="bg-accent hover:bg-accent/90 border-accent rounded-r-md border border-l-0 px-4 py-2 text-sm font-medium text-white transition-colors"
                  >
                    Применить
                  </button>
                </form>
                <div>
                  <button
                    class="btn btn-destructive-outline grow-0"
                    @click="clearCart"
                  >
                    <TrashIcon class="mr-2 size-4" />
                    Очистить корзину
                  </button>
                </div>
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
            <div v-else class="flex justify-center py-12 text-center">
              <div class="w-64">
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
                <RouterLink to="/catalog" class="btn btn-accent">
                  <ArrowLeftIcon class="mr-2 size-4" />
                  Перейти в каталог
                </RouterLink>
              </div>
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
              class="btn btn-accent btn-lg"
            >
              <CreditCardIcon class="size-5" /> Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
