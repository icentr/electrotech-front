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

            <form @submit.stop.prevent="submitOrder">
              <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div v-for="field in userFields">
                  <label
                    for="surname"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >{{ field.title }}
                    <span class="text-red-400"> * </span>
                  </label>
                  <input
                    type="text"
                    id="surname"
                    v-model="field.value"
                    class="entry"
                    required
                    disabled
                  />
                </div>
              </div>

              <h2 class="mb-6 text-lg font-bold text-gray-900">
                Данные компании
              </h2>

              <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div v-for="field in companyFields">
                  <label
                    for="surname"
                    class="mb-1 block text-sm font-medium text-gray-700"
                    >{{ field.title }}
                    <span class="text-red-400"> * </span></label
                  >
                  <input
                    type="text"
                    id="surname"
                    v-model="field.value"
                    class="entry"
                    required
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Боковая панель - итоги заказа -->
        <div class="lg:col-span-1">
          <div
            class="sticky top-28 flex flex-col gap-3 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
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
              class="btn btn-lg"
              :class="
                orderForm.allRequiredFields
                  ? 'btn-accent'
                  : 'btn-accent-outline'
              "
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
                'mt-4',
                orderMessageType === 'success'
                  ? 'text-green-600'
                  : 'text-red-600',
              ]"
            >
              {{ orderMessage }}
            </p>

            <div class="mt-4 text-sm text-gray-500">
              После оформления заказа с вами свяжутся наши сотрудники для
              уточнения оплаты и доставки.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cart";
import { getApi } from "@/api";
import { ArrowPathIcon, CreditCardIcon } from "@heroicons/vue/16/solid";

const api = getApi();

const orderMessage = ref("");
const orderMessageType = ref(""); // "success" или "error"

const router = useRouter();
const cartStore = useCartStore();

const orderForm = ref({
  email: "",
  phoneNumber: "",
  firstName: "",
  surname: "",
  lastName: "",
  positionInCompany: "",
  companyName: "",
  companyInn: "",
  companyAddress: "",
  companyOkpo: "",
  paymentMethod: "invoice",
  comments: "",
  allRequiredFields: false,
});

const isSubmitting = ref(false);

const formatCurrency = (amount: number) => {
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
      orderForm.value.phoneNumber = userResponse.data.phone_number || "";
      orderForm.value.firstName = userResponse.data.first_name || "";
      orderForm.value.surname = userResponse.data.surname || "";
      orderForm.value.lastName = userResponse.data.last_name || "";
    }

    const companyResponse = await api.post("/user/get-company-data");
    if (companyResponse.data) {
      orderForm.value.positionInCompany =
        companyResponse.data.positionInCompany || "";
      orderForm.value.companyName = companyResponse.data.companyName || "";
      orderForm.value.companyInn = companyResponse.data.companyInn || "";
      orderForm.value.companyAddress =
        companyResponse.data.companyAddress || "";
      orderForm.value.companyOkpo = companyResponse.data.companyOkpo || "";

      orderForm.value.allRequiredFields =
        companyResponse.data.allRequiredFields;
    }
  } catch (error) {
    console.warn("Ошибка при автозаполнении данных", error);
  }
});

const submitOrder = async () => {
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

const userFields = computed(() => [
  { title: "Фамилия", value: orderForm.value.surname },
  { title: "Имя", value: orderForm.value.firstName },
  { title: "Отчество", value: orderForm.value.lastName },
  { title: "Email", value: orderForm.value.email },
  { title: "Телефон", value: orderForm.value.phoneNumber },
  { title: "Должность", value: orderForm.value.positionInCompany },
]);
const companyFields = computed(() => [
  { title: "Название компании", value: orderForm.value.companyName },
  { title: "ИНН", value: orderForm.value.companyInn },
  { title: "Юридический адрес", value: orderForm.value.companyAddress },
  { title: "ОКПО", value: orderForm.value.companyOkpo },
]);

usePageTitle("Оформление заказа");
</script>
