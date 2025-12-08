<!-- src/pages/product/[id].vue -->
<template>
  <Breadcrumbs
    :breadcrumbs="[{ name: 'Каталог', url: '/catalog' }]"
    :page="product?.name || 'Загрузка...'"
  />
  <div class="pb-12" v-if="product">
    <div class="container mx-auto px-4" v-if="product">
      <!-- Хлебные крошки -->

      <div class="flex flex-col gap-8 lg:flex-row">
        <!-- Основная информация о товаре -->
        <div class="">
          <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div class="flex flex-col gap-6 md:flex-row">
              <!-- Изображение товара -->
              <div class="md:w-1/3">
                <div
                  class="flex items-center justify-center rounded-lg bg-gray-100"
                >
                  <img
                    :src="getImageUrl(product.imagePath)"
                    :alt="product.name"
                    class="max-h-full w-full rounded-lg object-contain"
                  />
                </div>
              </div>

              <!-- Основные характеристики -->
              <div class="md:w-2/3">
                <h1 class="mb-2 text-2xl font-bold text-gray-900">
                  {{ product.name }}
                </h1>
                <span class="text-sm text-gray-500"
                  >Артикул: {{ product.articleNumber }}</span
                >

                <div class="mb-4 flex items-center">
                  <div class="mr-2 flex text-yellow-400">
                    <StarIcon
                      class="size-5"
                      v-for="i in 5"
                      :key="i"
                      :class="{ 'text-gray-300': i > product.rating }"
                    />
                  </div>
                </div>

                <div class="mb-6">
                  <div class="mb-2 flex items-baseline">
                    <span class="mr-3 text-3xl font-bold text-gray-900">
                      {{ formatCurrency(product.price, product.currency) }}
                    </span>

                    <span
                      v-if="product.oldPrice"
                      class="text-lg text-gray-500 line-through"
                    >
                      {{ formatCurrency(product.oldPrice, product.currency) }}
                    </span>
                    <span
                      v-if="product.oldPrice"
                      class="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800"
                      >-{{
                        Math.round(
                          (1 -
                            parseFloat(product.price.replace(/\s/g, "")) /
                              parseFloat(product.oldPrice.replace(/\s/g, ""))) *
                            100,
                        )
                      }}%</span
                    >
                  </div>

                  <div
                    class="text-sm font-medium text-green-600"
                    v-if="product.count > 0"
                  >
                    В наличии ({{ product.count }} шт.)
                  </div>
                  <div class="text-sm text-gray-500" v-else>Под заказ</div>
                </div>

                <!-- Кнопки действий -->
                <div class="flex flex-col gap-3 sm:flex-row">
                  <button
                    :disabled="product.count === 0"
                    class="btn btn-accent btn-lg"
                    @click="addToCart"
                  >
                    <ShoppingCartIcon class="mr-2 size-5" />
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Подробное описание и характеристики -->
          <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-bold text-gray-900">
              Описание товара
            </h2>
            <p v-if="product.description" class="mb-6 text-gray-700">
              {{ product.description }}
            </p>
            <p v-else class="text-gray-500">Описание отсутствует</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getApi } from "@/api";

const api = getApi();
import { getImageUrl } from "@/api";
import { useCartStore } from "@/stores/cart";
import { ShoppingCartIcon, StarIcon } from "@heroicons/vue/16/solid";

const route = useRoute();
const product = ref();
const loading = ref(true);
const error = ref(null);

const cartStore = useCartStore();

const fetchProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    product.value = response.data.product;
  } catch (err) {
    console.error("Ошибка при загрузке товара:", err);
    error.value = "Не удалось загрузить данные товара.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProduct(route.params.id);
});

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
    // toast.success(`«${product.value.name}» добавлен в корзину`);
  }
};
const pageTitle = computed(() => product.value?.name || "Загрузка...");

useHead({
  title: pageTitle,
});
</script>
