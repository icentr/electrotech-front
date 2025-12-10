<template>
  <Breadcrumbs
    :page="order ? 'Заказ №' + order.id : 'Неизвестный заказ'"
    :breadcrumbs="[{ url: '/account/', name: 'Профиль' }]"
  />
  <div class="container mx-auto px-4 py-8">
    <div v-if="order">
      <h1 class="mb-4 text-2xl font-bold">Заказ №{{ order.id }}</h1>
      <p class="mb-2">
        <strong>Дата:</strong> {{ formatDate(order.creationDate) }}
      </p>

      <h2 class="mt-6 mb-4 text-xl font-semibold">Товары</h2>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(product, index) in order.products"
          :key="index"
          class="group hover:border-accent relative flex h-full flex-col rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border hover:shadow-md"
        >
          <!-- Изображение -->
          <div
            class="relative mb-4 overflow-hidden rounded-lg bg-gray-100 pt-[70%]"
          >
            <img
              :src="getImageUrl(product.imagePath)"
              :alt="product.productName"
              class="absolute top-0 left-0 h-full w-full object-contain p-4"
            />

            <div
              v-if="product.badge"
              class="absolute top-3 left-3 rounded bg-yellow-400 px-2 py-1 text-xs font-bold text-yellow-800"
            >
              {{ product.badge }}
            </div>
          </div>

          <!-- Информация -->
          <div class="flex-grow">
            <NuxtLink
              :to="`/product/${product.productId}`"
              class="hover:text-accent mb-1 line-clamp-2 block text-lg font-bold text-gray-900 transition-colors"
            >
              {{ product.productName }}
            </NuxtLink>

            <!-- если есть производитель -->
            <div v-if="product.manufacturer" class="mb-4 flex items-center">
              <span class="text-sm font-semibold text-gray-700">{{
                product.manufacturer
              }}</span>
            </div>

            <div
              v-if="product.description"
              class="mb-4 line-clamp-2 text-sm text-gray-600"
            >
              {{ product.description }}
            </div>
          </div>

          <!-- Цена + количество -->
          <div class="mt-auto">
            <div class="mb-4 flex items-center justify-between">
              <div>
                <div class="text-xl font-bold text-gray-900">
                  {{ formatCurrency(product.productPrice) }}
                </div>
                <div
                  v-if="product.oldPrice"
                  class="text-sm text-gray-400 line-through"
                >
                  {{ formatCurrency(product.oldPrice) }}
                </div>
              </div>
              <div
                v-if="product.quantity > 0"
                class="flex items-center text-sm font-medium text-gray-500"
              >
                <CheckCircleIcon class="mr-1 size-4" />
                Количество ({{ product.quantity }})
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-right text-xl font-bold">
        Итого: {{ formatCurrency(orderTotal) }}
      </div>
    </div>
    <div v-else-if="loading" class="py-12 text-center text-gray-500">
      Загрузка
      <div class="flex items-center justify-center">
        <ArrowPathIcon class="mr-2 size-10 animate-spin" />
      </div>
    </div>
    <div v-else class="py-12 text-center text-gray-500">
      <div class="font-mono text-3xl text-orange-500">404</div>
      Нет такого заказа
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { getImageUrl } from "@/utils";
import { getApi } from "@/api";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/vue/16/solid";

const loading = ref(true);

const api = getApi();

const route = useRoute();
const order = ref(null);

onMounted(async () => {
  try {
    const { data } = await api.get("/orders/get");

    loading.value = false;
    const orders = data.orders;
    const id = Number(route.params.id);

    const found = orders.find((o) => o.id === id);
    if (found) {
      const rawDate = found.creationDate;
      const isoDate = rawDate.split(" ")[0] + "T" + rawDate.split(" ")[1];

      // Просто присваиваем без преобразований
      order.value = {
        ...found,
        date: isoDate,
      };
    }
  } catch (err) {
    console.error("Ошибка при загрузке заказа:", err);
  }
});

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString("ru-RU", options);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(value);
};

const orderTotal = computed(() => {
  if (!order.value) return 0;
  return order.value.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
});

watch(order, (val) => {
  if (val) {
    useHead({
      title: `Заказ №${val.id}`,
    });
  }
});
</script>
