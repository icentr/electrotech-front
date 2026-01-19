<script setup>
import { useCatalogStore } from "@/stores/catalog";
import { useUrlSearchParams } from "@vueuse/core";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/vue/16/solid";

usePageTitle("Каталог");

const urlParams = useUrlSearchParams();

/* Cool feature, maybe we should implement it somehow */
const IS_FOR_DEVS = false;

const catalog = useCatalogStore();
catalog.setPage(urlParams.page || 0);
catalog.setSearchString(urlParams.search || "");

catalog.fetch();

const goToPage = async (newPage) => {
  catalog.setPage(newPage);
  await catalog.fetch();
};
const search = ref(catalog.searchString);

const onSearch = async () => {
  catalog.setSearchString(search.value);
  await catalog.fetch();
};
const onResetSearch = async () => {
  search.value = "";
  catalog.setSearchString("");
  await catalog.fetch();
};

catalog.$subscribe((_, state) => {
  urlParams.page = state.currentPage;
  if (state.searchString) {
    console.log("Search string: %s", state.searchString);
    urlParams.search = state.searchString;
  } else {
    urlParams.search = "";
  }
});

const pagesToShow = computed(() => {
  let pages = [];

  for (let i = 0; i <= catalog.totalPages; i++) {
    if (Math.abs(catalog.currentPage - i) <= 2) {
      pages.push(i);
    }
  }
  return pages;
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
                <form
                  @submit.prevent="onSearch"
                  @reset="onResetSearch"
                  class="flex gap-2"
                >
                  <input
                    v-model="search"
                    class="entry"
                    placeholder="Поиск товаров..."
                  />
                  <button
                    title="Очистить поисковый запрос"
                    type="reset"
                    class="base-btn btn-destructive rounded-sm px-2 py-2"
                    v-if="search"
                  >
                    <XMarkIcon class="size-8" />
                  </button>
                  <button
                    class="base-btn btn-accent rounded-sm rounded-r-md px-2 py-2"
                    type="submit"
                  >
                    <MagnifyingGlassIcon class="size-8" />
                  </button>
                </form>
              </div>
              <div
                class="mt-4 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 shadow-sm transition-all duration-700 hover:shadow-lg md:mt-0"
              >
                Найдено товаров:
                <span class="font-semibold text-gray-900">{{
                  catalog.totalProducts
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
                class="base-btn border-r border-gray-200 bg-white px-4 py-3 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeftIcon class="size-5" />
              </button>
              <div class="max-h-fit grow overflow-x-auto">
                <button
                  v-for="n in pagesToShow"
                  :key="n"
                  @click="goToPage(n)"
                  class="border-r border-gray-200 px-5 py-3 transition-colors last:border-r-0"
                  :class="{
                    'bg-white text-gray-500 hover:bg-gray-50':
                      n !== catalog.currentPage,
                    'text-accent border-accent bg-accent/10 font-semibold':
                      n === catalog.currentPage,
                  }"
                >
                  <span v-if="IS_FOR_DEVS" class="font-mono">
                    {{ n }}
                  </span>
                  <span v-else>
                    {{ n + 1 }}
                  </span>
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
