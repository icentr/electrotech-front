<template>
  <title>Оформление заказа</title>
  <div class="pb-12">
    <div class="container mx-auto px-4">
      <!-- Хлебные крошки -->
      <div class="py-4">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-2">
            <li class="inline-flex items-center">
              <RouterLink
                to="/"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <i class="fas fa-home mr-2"></i>
                Главная
              </RouterLink>
            </li>
            <li>
              <div class="flex items-center">
                <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                <RouterLink
                  to="/cart"
                  class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                  >Корзина</RouterLink
                >
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2"
                  >Оформление заказа</span
                >
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-6">Оформление заказа</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Основная часть - форма оформления -->
        <div class="lg:col-span-2">
          <div
            class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6"
          >
            <h2 class="text-lg font-bold text-gray-900 mb-6">
              Контактные данные
            </h2>

            <form @submit.prevent="submitOrder">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    for="surname"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Фамилия *</label
                  >
                  <input
                    type="text"
                    id="surname"
                    v-model="orderForm.surname"
                    class="w-full border border-gray-300 bg-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Имя *</label
                  >
                  <input
                    type="text"
                    id="firstName"
                    v-model="orderForm.firstName"
                    class="w-full border border-gray-300 bg-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Email *</label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="orderForm.email"
                    class="w-full border border-gray-300 bg-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Телефон *</label
                  >
                  <input
                    type="tel"
                    id="phone"
                    v-model="orderForm.phone_number"
                    class="w-full border border-gray-300 bg-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="position_in_company"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Должность в компании *</label
                  >
                  <input
                    type="text"
                    id="position_in_company"
                    v-model="orderForm.position_in_company"
                    class="w-full border border-gray-300 bg-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled
                  />
                </div>
              </div>

              <h2 class="text-lg font-bold text-gray-900 mb-6">
                Данные компании
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    for="company_name"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Название компании *</label
                  >
                  <input
                    type="text"
                    id="company_name"
                    v-model="orderForm.company_name"
                    class="w-full border border-gray-300 bg-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="inn"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >ИНН *</label
                  >
                  <input
                    type="text"
                    id="inn"
                    v-model="orderForm.company_inn"
                    class="w-full border border-gray-300 bg-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="legalAddress"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Юридический адрес *</label
                  >
                  <input
                    type="text"
                    id="legalAddress"
                    v-model="orderForm.company_address"
                    class="w-full border border-gray-300 bg-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled
                  />
                </div>
              </div>

              <!-- <h2 class="text-lg font-bold text-gray-900 mb-6">Оплата</h2>

              <div class="mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="radio"
                      id="paymentInvoice"
                      v-model="orderForm.paymentMethod"
                      value="invoice"
                      class="hidden peer"
                    />
                    <label
                      for="paymentInvoice"
                      class="block p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50"
                    >
                      <div class="flex items-center">
                        <div
                          class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3"
                        >
                          <i
                            class="fas fa-file-invoice text-blue-600 text-sm"
                          ></i>
                        </div>
                        <div>
                          <h3 class="font-medium text-gray-900">
                            Безналичный расчет
                          </h3>
                          <p class="text-sm text-gray-500">Выставление счета</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="paymentCard"
                      v-model="orderForm.paymentMethod"
                      value="card"
                      class="hidden peer"
                    />
                    <label
                      for="paymentCard"
                      class="block p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50"
                    >
                      <div class="flex items-center">
                        <div
                          class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3"
                        >
                          <i
                            class="fas fa-credit-card text-blue-600 text-sm"
                          ></i>
                        </div>
                        <div>
                          <h3 class="font-medium text-gray-900">
                            Оплата картой
                          </h3>
                          <p class="text-sm text-gray-500">Онлайн-оплата</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div> -->

              <div class="mb-6">
                <label
                  for="comments"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Комментарий к заказу</label
                >
                <textarea
                  id="comments"
                  v-model="orderForm.comments"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-4"
          >
            <h2 class="text-lg font-bold text-gray-900 mb-4">Ваш заказ</h2>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Товары ({{ totalItems }})</span>
                <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Скидка</span>
                <span class="text-red-600 font-medium"
                  >-{{ formatCurrency(discount) }}</span
                >
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4 mb-6">
              <div class="flex justify-between text-lg font-bold text-gray-900">
                <span>Итого</span>
                <span>{{ formatCurrency(total) }}</span>
              </div>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              @click="submitOrder"
              :disabled="isSubmitting"
            >
              <template v-if="isSubmitting">
                <i class="fas fa-spinner fa-spin mr-2"></i> Оформление...
              </template>
              <template v-else>
                <i class="fas fa-credit-card mr-2"></i> Оформить заказ
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
    orderMessage.value = "Произошла ошибка при оформлении заказа. Попробуйте еще раз.";
    orderMessageType.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};


useHead({
  title:"Оформление заказа"
})
</script>
