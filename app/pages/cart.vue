<script setup>
import { PlusIcon, MinusIcon, TrashIcon, ChevronRightIcon, ShoppingCartIcon, ArrowLeftIcon, CreditCardIcon } from "@heroicons/vue/16/solid";
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
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Корзина</h1>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Основная часть - список товаров -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <!-- Заголовок таблицы -->
                        <div class="hidden md:grid grid-cols-12 gap-4 mb-4 border-b border-gray-200 pb-3">
                            <div class="col-span-6 text-sm font-medium text-gray-500">Товар</div>
                            <div class="col-span-2 text-sm font-medium text-gray-500">Цена</div>
                            <div class="col-span-2 text-sm font-medium text-gray-500">Количество</div>
                            <div class="col-span-2 text-sm font-medium text-gray-500">Сумма</div>
                        </div>

                        <!-- Список товаров -->
                        <div v-if="cartItems.length > 0">
                            <div v-for="item in cartItems" :key="item.id"
                                class="flex flex-col md:grid grid-cols-3 md:grid-cols-12 gap-4 py-4 border-b border-gray-100">
                                <!-- Изображение и название -->
                                <div class="col-span-3 md:col-span-6 flex items-start">
                                    <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                                        <img :src="item.imagePath" :alt="item.name" class="max-h-full" />
                                    </div>
                                    <div>
                                        <RouterLink :to="`/product/${item.id}`"
                                            class="text-sm font-medium text-gray-900 hover:text-blue-600">{{ item.name
                                            }}</RouterLink>
                                        <p class="text-xs text-gray-500 mt-1">Код: {{ item.code }}</p>
                                        <button
                                            class="md:text-sm text-red-600 hover:text-red-800 mt-2 flex items-center"
                                            @click="removeFromCart(item.id)">
                                            <TrashIcon class="size-4 mr-1" />
                                            Удалить
                                        </button>
                                    </div>
                                </div>

                                <!-- Цена -->
                                <div class="col-span-1 md:col-span-2 flex gap-2 items-baseline">
                                    <div class="md:hidden text-gray-500 mb-1">Цена</div>
                                    <div class="text-md">
                                        {{ formatCurrency(item.price) }}
                                    </div>
                                </div>

                                <!-- Количество -->
                                <div class="col-span-1 md:col-span-2 flex gap-2 items-baseline">
                                    <div class="md:hidden text-gray-500 mb-1">Кол-во</div>
                                    <div class="flex items-center border border-gray-300 rounded-md">
                                        <button class="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                            @click="updateQuantity(item.id, item.quantity - 1)"
                                            :disabled="item.quantity <= 1">
                                            <MinusIcon class="size-4" />
                                        </button>
                                        <input type="number" min="1"
                                            class="w-10 text-start ps-3 border-x border-gray-300 py-1 text-sm no-spinner"
                                            v-model.number="item.quantity"
                                            @change="updateQuantity(item.id, item.quantity)" />
                                        <button class="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                            @click="updateQuantity(item.id, item.quantity + 1)">
                                            <PlusIcon class="size-4" />
                                        </button>
                                    </div>
                                </div>

                                <!-- Сумма -->
                                <div class="col-span-1 md:col-span-2 flex gap-2 items-baseline">
                                    <div class="md:hidden text-gray-500 mb-1">Сумма</div>
                                    <div class="">
                                        {{ formatCurrency(item.price * item.quantity) }}
                                    </div>
                                </div>
                            </div>

                            <!-- Промокод -->
                            <div
                                class="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <form class="flex-1 flex items-center" @submit.prevent="applyPromoCode">
                                    <input type="text" placeholder="Введите промокод"
                                        class="border border-gray-300 rounded-l-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        v-model="promoCode" />
                                    <button
                                        class="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm font-medium hover:bg-blue-700 transition-colors">Применить</button>
                                </form>
                                <button class="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center"
                                    @click="clearCart">
                                    <TrashIcon class="size-4 mr-2" />
                                    Очистить корзину
                                </button>
                            </div>
                            <p v-if="message"
                                :class="message === 'Промокод недействителен' ? 'text-red-600' : 'text-green-600'"
                                class="mt-2 text-sm">
                                {{ message }}
                            </p>
                        </div>

                        <!-- Пустая корзина -->
                        <div v-else class="py-12 text-center">
                            <div
                                class="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <ShoppingCartIcon class="size-6 text-gray-400" />
                            </div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Ваша корзина пуста</h3>
                            <p class="text-gray-500 mb-6">Добавьте товары из каталога, чтобы продолжить</p>
                            <RouterLink to="/catalog"
                                class="bg-accent text-white py-2 px-6 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center">
                                <ArrowLeftIcon class="size-4 mr-2" />
                                Перейти в каталог
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <!-- Боковая панель - итоги -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-4">
                        <h2 class="text-lg font-bold text-gray-900 mb-4">Ваш заказ</h2>

                        <div class="space-y-3 mb-6">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Товары ({{ totalItems }})</span>
                                <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Скидка</span>
                                <span class="text-red-600 font-medium">-{{ formatCurrency(discount) }}</span>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 pt-4 mb-6">
                            <div class="flex justify-between text-lg font-bold text-gray-900">
                                <span>Итого</span>
                                <span>{{ formatCurrency(total) }}</span>
                            </div>
                        </div>

                        <button v-if="cartItems.length > 0" @click="handleCheckout"
                            class="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                            <CreditCardIcon class="size-4 mr-2" /> Оформить заказ
                        </button>

                        <div class="mt-4 text-xs text-gray-500">
                            Нажимая на кнопку, вы соглашаетесь с
                            <a href="#" class="text-blue-600 hover:underline">условиями обработки персональных
                                данных</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
