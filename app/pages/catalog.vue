<script setup>
import { ref, onMounted, computed } from "vue";
import ProductCard from "../components/ProductCard.vue";
import { useCartStore } from "../stores/cart";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/16/solid";
import { getApi } from "~/api";

const api = getApi();

useHead({
  title: "Каталог",
});

const isLoading = ref(true);

const cart = useCartStore();

const products = ref([]);
const page = ref(1);
const totalPages = ref(1);

const fetchProducts = async () => {
  try {
    isLoading.value = true;

    const response = await api.get("/products/all/0");

    products.value = response.data.products || [];
    totalPages.value = response.data.totalPages || 1;
    isLoading.value = false;
  } catch (error) {
    console.error("Ошибка при фильтрации товаров:", error);
  }
};

const goToPage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
    fetchProducts();
  }
};

const addToCart = (product) => {
  cart.addToCart(product);
};

onMounted(async () => {
  await fetchProducts();
});
</script>

<template>
  <div class="pb-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col gap-8 lg:flex-row">
        <!-- Основная область с товарами -->
        <div class="min-w-0 flex-1">
          <div
            class="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h1 class="mb-2 text-2xl font-bold text-gray-900">
                  Каталог товаров
                </h1>
                <p class="text-gray-500">Подборка товаров по вашим критериям</p>
              </div>
              <div
                class="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-500 md:mt-0"
              >
                Найдено товаров:
                <span class="font-semibold text-gray-900">{{
                  products.length
                }}</span>
              </div>
            </div>
          </div>

          <!-- Список товаров -->
          <div
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @add-to-cart="addToCart"
            />
          </div>

          <!-- Пагинация -->
          <div class="mt-10 flex justify-center">
            <nav
              class="inline-flex overflow-hidden rounded-lg border border-gray-200 shadow-sm"
            >
              <button
                @click="goToPage(page - 1)"
                :disabled="page === 1"
                class="border-r border-gray-200 bg-white px-4 py-3 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeftIcon class="size-5" />
              </button>
              <button
                v-for="n in totalPages"
                :key="n"
                @click="goToPage(n)"
                class="border-r border-gray-200 px-5 py-3 transition-colors last:border-r-0"
                :class="{
                  'bg-white text-gray-500 hover:bg-gray-50': n !== page,
                  'text-accent border-blue-200 bg-blue-50 font-semibold':
                    n === page,
                }"
              >
                {{ n }}
              </button>
              <button
                @click="goToPage(page + 1)"
                :disabled="page === totalPages"
                class="border-l border-gray-200 bg-white px-4 py-3 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowRightIcon class="size-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner {
  -moz-appearance: textfield;
}

/* Улучшенные стили для скроллбара */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
