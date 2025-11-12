<template>
  <Breadcrumbs
    page="Оформление заказа"
    :breadcrumbs="[{ url: '/cart', name: 'Корзина' }]"
  />
  <div class="pb-12">
    <div class="container mx-auto px-4">
      <h1 class="mb-6 text-2xl font-bold text-gray-900">Оформление заказа</h1>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Основная часть - форма оформления -->
        <div class="lg:col-span-2">
          <div
            class="mb-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h2 class="mb-6 text-lg font-bold text-gray-900">
              Контактные данные
            </h2>

            <form @submit.prevent="submitOrder">
              <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    for="surname"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >Фамилия *</label
                  >
                  <input
                    type="text"
                    id="surname"
                    v-model="orderForm.surname"
                    class="w-full rounded-md border border-gray-300 bg-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="firstName"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >Имя *</label
                  >
                  <input
                    type="text"
                    id="firstName"
                    v-model="orderForm.firstName"
                    class="w-full rounded-md border border-gray-300 bg-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >Email *</label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="orderForm.email"
                    class="w-full rounded-md border border-gray-300 bg-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >Телефон *</label
                  >
                  <input
                    type="tel"
                    id="phone"
                    v-model="orderForm.phone_number"
                    class="w-full rounded-md border border-gray-300 bg-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="position_in_company"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >Должность в компании *</label
                  >
                  <input
                    type="text"
                    id="position_in_company"
                    v-model="orderForm.position_in_company"
                    class="w-full rounded-md border border-gray-300 bg-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    disabled
                  />
                </div>
              </div>

              <h2 class="mb-6 text-lg font-bold text-gray-900">
                Данные компании
              </h2>

              <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    for="company_name"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >Название компании *</label
                  >
                  <input
                    type="text"
                    id="company_name"
                    v-model="orderForm.company_name"
                    class="w-full rounded-md border border-gray-300 bg-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="inn"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >ИНН *</label
                  >
                  <input
                    type="text"
                    id="inn"
                    v-model="orderForm.company_inn"
                    class="w-full rounded-md border border-gray-300 bg-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="legalAddress"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >Юридический адрес *</label
                  >
                  <input
                    type="text"
                    id="legalAddress"
                    v-model="orderForm.company_address"
                    class="w-full rounded-md border border-gray-300 bg-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="legalAddress"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >ОКПО *</label
                  >
                  <input
                    type="text"
                    id="legalAddress"
                    v-model="orderForm.company_okpo"
                    class="w-full rounded-md border border-gray-300 bg-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    disabled
                  />
                </div>
              </div>

              <div class="mb-6">
                <label
                  for="comments"
                  class="mb-1 block text-sm font-medium text-gray-700"
                  >Комментарий к заказу</label
                >
                <textarea
                  id="comments"
                  v-model="orderForm.comments"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows="3"
                  placeholder="Укажите дополнительные пожелания по заказу..."
                ></textarea>
              </div>

              <div class="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  v-model="orderForm.agreeTerms"
                  class="mt-1 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <label for="agreeTerms" class="text-sm text-gray-700">
                  Я согласен с
                  <a href="#" class="text-blue-600 hover:underline"
                    >условиями обработки персональных данных</a
                  >
                  и
                  <a href="#" class="text-blue-600 hover:underline"
                    >договором оферты</a
                  >
                </label>
              </div>
            </form>
          </div>
        </div>

        <!-- Боковая панель - итоги заказа -->
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
              type="submit"
              class="btn btn-accent btn-lg"
              @click="submitOrder"
              :disabled="isSubmitting"
            >
              <template v-if="isSubmitting">
                <ArrowPathIcon class="mr-2 size-4" />
                Оформление...
              </template>
              <template v-else>
                <CreditCardIcon class="mr-2 size-4" />
                Оформить заказ
              </template>
            </button>
            <p
              v-if="orderMessage"
              :class="[
                'mt-4 text-sm',
                orderMessageType === 'success'
                  ? 'text-green-600'
                  : 'text-red-600',
              ]"
            >
              {{ orderMessage }}
            </p>

            <div class="mt-4 text-xs text-gray-500">
              После оформления заказа вам будет выставлен счет на оплату
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";
import { getApi } from "@/api";
import {
  ArrowPathIcon,
  ChevronRightIcon,
  CreditCardIcon,
} from "@heroicons/vue/16/solid";

const api = getApi();

const orderMessage = ref("");
const orderMessageType = ref(""); // "success" или "error"

const router = useRouter();
const cartStore = useCartStore();

const orderForm = ref({
  email: "",
  phone_number: "",
  firstName: "",
  surname: "",
  position_in_company: "",
  company_name: "",
  company_inn: "",
  company_address: "",
  company_okpo: "",
  paymentMethod: "invoice",
  comments: "",
  agreeTerms: false,
});

const isSubmitting = ref(false);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Вычисляемые свойства из стора
const subtotal = computed(() => cartStore.subtotal);
const discount = computed(() => cartStore.discount);
const total = computed(() => subtotal.value - discount.value);
const totalItems = computed(() => cartStore.totalItems);

onMounted(async () => {
  if (totalItems.value === 0) {
    router.push("/cart");
    return;
  }

  try {
    const userResponse = await api.post("/user/get-data");
    if (userResponse.data) {
      orderForm.value.email = userResponse.data.email || "";
      orderForm.value.phone_number = userResponse.data.phone_number || "";
      orderForm.value.firstName = userResponse.data.first_name || "";
      orderForm.value.surname = userResponse.data.surname || "";
    }

    const companyResponse = await api.post("/user/get-company-data");
    if (companyResponse.data) {
      orderForm.value.position_in_company =
        companyResponse.data.positionInCompany || "";
      orderForm.value.company_name = companyResponse.data.companyName || "";
      orderForm.value.company_inn = companyResponse.data.companyINN || "";
      orderForm.value.company_address =
        companyResponse.data.companyAddress || "";
      orderForm.value.company_okpo = companyResponse.data.companyOKPO || "";
    }
  } catch (error) {
    console.warn("Ошибка при автозаполнении данных", error);
  }
});

const submitOrder = async () => {
  if (!orderForm.value.agreeTerms) {
    orderMessage.value = "Пожалуйста, согласитесь с условиями обработки данных";
    orderMessageType.value = "error";
    return;
  }

  if (totalItems.value === 0) {
    orderMessage.value = "Ваша корзина пуста";
    orderMessageType.value = "error";
    return;
  }

  isSubmitting.value = true;

  try {
    const productsPayload = cartStore.cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      products: productsPayload,
      paymentMethod: orderForm.value.paymentMethod,
      comments: orderForm.value.comments,
    };

    await api.post("/orders/create", orderData);

    const { data } = await api.get("/orders/get");

    const sortedOrders = [...data.orders].sort((a, b) => b.id - a.id);
    const lastOrder = sortedOrders[0];

    if (lastOrder?.id) {
      orderMessage.value = "Спасибо! Ваш заказ успешно оформлен.";
      orderMessageType.value = "success";

      cartStore.clearCart();

      router.push(`/orders/${lastOrder.id}`);
    } else {
      router.push("/orders");
    }
  } catch (error) {
    orderMessage.value =
      "Произошла ошибка при оформлении заказа. Попробуйте еще раз.";
    orderMessageType.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};

useHead({
  title: "Оформление заказа",
});
</script>
