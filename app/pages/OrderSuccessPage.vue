<template>
  <Breadcrumbs page="Заказ оформлен" />
  <div class="pb-12">
    <div class="container mx-auto px-4">
      <!-- Хлебные крошки -->

      <div v-if="isLoading" class="py-12 text-center">
        <ArrowPathIcon class="size-7 animate-spin" />
      </div>

      <div
        v-else-if="orderData"
        class="mx-auto max-w-3xl rounded-lg bg-white p-8 text-center shadow-sm"
      >
        <div
          class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        >
          <CheckIcon class="size-4 text-green-600" />
        </div>

        <h1 class="mb-4 text-2xl font-bold text-gray-900">
          Спасибо за ваш заказ!
        </h1>
        <p class="mb-6 text-gray-600">
          Ваш заказ
          <span class="font-medium text-gray-900">№{{ orderData.id }}</span>
          успешно оформлен.
        </p>

        <!-- Информация о заказе -->
        <div class="mb-8 rounded-lg bg-blue-50 p-6 text-left">
          <h2 class="mb-4 text-lg font-bold text-gray-900">
            Информация о заказе
          </h2>

          <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 class="mb-2 text-sm font-medium text-gray-500">
                Номер заказа
              </h3>
              <p class="font-medium">{{ orderData.id }}</p>
            </div>
            <div>
              <h3 class="mb-2 text-sm font-medium text-gray-500">
                Дата оформления
              </h3>
              <p class="font-medium">{{ formatDate(orderData.date) }}</p>
            </div>
            <div>
              <h3 class="mb-2 text-sm font-medium text-gray-500">
                Способ оплаты
              </h3>
              <p class="font-medium">
                {{
                  orderData.payment === "invoice"
                    ? "Безналичный расчет"
                    : orderData.payment === "card"
                      ? "Оплата картой"
                      : "Не указан"
                }}
              </p>
            </div>
            <div>
              <h3 class="mb-2 text-sm font-medium text-gray-500">
                Способ получения
              </h3>
              <p class="font-medium">
                {{
                  orderData.delivery === "pickup"
                    ? "Самовывоз"
                    : orderData.delivery === "courier"
                      ? "Доставка курьером"
                      : orderData.delivery === "transport"
                        ? "Доставка транспортной компанией"
                        : "Не указан"
                }}
              </p>
            </div>
            <div v-if="orderData.delivery !== 'pickup' && orderData.address">
              <h3 class="mb-2 text-sm font-medium text-gray-500">
                Адрес доставки
              </h3>
              <p class="font-medium">{{ orderData.address }}</p>
            </div>
          </div>

          <!-- Итоги -->
          <div class="border-t border-gray-200 pt-4">
            <div class="mb-2 flex justify-between">
              <span class="text-gray-600">Сумма заказа:</span>
              <span class="font-medium">{{
                formatCurrency(orderData.subtotal)
              }}</span>
            </div>
            <div
              class="mb-2 flex justify-between"
              v-if="orderData.discount > 0"
            >
              <span class="text-gray-600">Скидка:</span>
              <span class="font-medium text-red-600"
                >-{{ formatCurrency(orderData.discount) }}</span
              >
            </div>
            <div class="mb-2 flex justify-between">
              <span class="text-gray-600">Доставка:</span>
              <span class="font-medium">
                {{
                  orderData.deliveryCost === 0
                    ? "Бесплатно"
                    : formatCurrency(orderData.deliveryCost)
                }}
              </span>
            </div>
            <div
              class="mt-3 flex justify-between border-t border-gray-200 pt-3 text-lg font-bold text-gray-900"
            >
              <span>Итого:</span>
              <span>{{ formatCurrency(orderData.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Счет на оплату -->
        <div class="mb-8" v-if="orderData.payment === 'invoice'">
          <h2 class="mb-4 text-lg font-bold text-gray-900">Счет на оплату</h2>
          <div
            class="rounded-lg border border-gray-200 bg-white p-6 text-center"
          >
            <div
              class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
            >
              <DocumentTextIcon class="size-6 text-blue-600" />
            </div>
            <p class="mb-4 text-gray-600">
              Счет №{{ orderData.invoiceNumber }} от
              {{ formatDate(orderData.invoiceDate) }} отправлен на ваш email
            </p>
            <div class="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                :href="orderData.invoicePdfUrl"
                target="_blank"
                class="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <ArrowDownTrayIcon class="mr-2 size-4" />
              </a>
              <button
                class="rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
              >
                <EnvelopeIcon class="mr-2 size-4" />
                Отправить повторно
              </button>
            </div>
          </div>
        </div>

        <!-- Кнопки -->
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <NuxtLink
            to="/catalog"
            class="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <ArrowLeftIcon class="mr-2 size-4" />
            Вернуться в каталог
          </NuxtLink>
          <NuxtLink
            to="/account/orders"
            class="rounded-md border border-blue-600 bg-white px-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            <ListBulletIcon class="mr-2 size-4" />
            Мои заказы
          </NuxtLink>
        </div>
      </div>

      <div v-else class="py-12 text-center text-gray-500">Заказ не найден</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getApi } from "@/api";
import {
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ListBulletIcon,
} from "@heroicons/vue/16/solid";
usePageTitle("Заказ создан");
const api = getApi();

const orderData = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get("/orders/get");
    const allOrders = response.data;

    if (Array.isArray(allOrders) && allOrders.length > 0) {
      // Сортируем по дате создания — на случай, если порядок не гарантирован
      const sorted = allOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      orderData.value = sorted[0];
    } else {
      orderData.value = null;
    }
  } catch (error) {
    console.error("Ошибка при загрузке заказов:", error);
    orderData.value = null;
  } finally {
    isLoading.value = false;
  }
});

const formatCurrency = (amount) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount ?? 0);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
