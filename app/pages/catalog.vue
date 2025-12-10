<script setup>
import { useCatalogStore } from "@/stores/catalog";
import { useUrlSearchParams } from "@vueuse/core";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/16/solid";

useHead({
  title: "Каталог",
});

const urlParams = useUrlSearchParams();

const catalog = useCatalogStore();
catalog.setPage(urlParams.page || 0);

const goToPage = async (newPage) => {
  await catalog.setPage(newPage);
};

const addToCart = (product) => {
  cart.addToCart(product);
};
catalog.$subscribe((_, state) => {
  urlParams.page = state.currentPage;
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
                  catalog.products.length
                }}</span>
              </div>
            </div>
          </div>

          <!-- Список товаров -->
          <div
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <TransitionGroup name="product-card">
              <ProductCard
                v-for="product in catalog.products"
                :key="product.id"
                :product="product"
                @add-to-cart="addToCart"
              />
            </TransitionGroup>
          </div>

          <!-- Пагинация -->
          <div class="mt-10 flex justify-center">
            <nav
              class="inline-flex overflow-hidden rounded-lg border border-gray-200 shadow-sm"
            >
              <button
                @click="goToPage(catalog.currentPage - 1)"
                :disabled="catalog.currentPage === 1"
                class="border-r border-gray-200 bg-white px-4 py-3 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeftIcon class="size-5" />
              </button>
              <div class="max-h-fit grow overflow-x-auto">
                <button
                  v-for="n in catalog.totalPages"
                  :key="n"
                  @click="goToPage(n - 1)"
                  class="border-r border-gray-200 px-5 py-3 transition-colors last:border-r-0"
                  :class="{
                    'bg-white text-gray-500 hover:bg-gray-50':
                      n - 1 !== catalog.currentPage,
                    'text-accent border-blue-200 bg-blue-50 font-semibold':
                      n - 1 === catalog.currentPage,
                  }"
                >
                  {{ n }}
                </button>
              </div>
              <button
                @click="goToPage(catalog.currentPage + 1)"
                :disabled="catalog.currentPage === catalog.totalPages"
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
