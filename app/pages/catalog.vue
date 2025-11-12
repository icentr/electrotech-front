<script setup>
import { ref, onMounted, computed } from "vue";
import ProductCard from "../components/ProductCard.vue";
import { useCartStore } from "../stores/cart";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
  FunnelIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/vue/16/solid";
import { getApi } from "@/api";

const api = getApi();

useHead({
  title: "Каталог",
});

const isLoading = ref(true);

const cart = useCartStore();

const products = ref([]);
const page = ref(1);
const totalPages = ref(1);
const priceMin = ref(null);
const priceMax = ref(null);
const filters = ref([]);
const categories = ref([]);

// Реактивные переменные для управления фильтрами
const isFiltersOpen = ref(false);
const activeFilterSection = ref(null);
const desktopExpandedFilters = ref(new Set());

const fetchFilters = async () => {
  try {
    const response = await api.get("/filters");
    const rawFilters = response.data.parameters;

    filters.value = [];
    categories.value = [];

    rawFilters.forEach((f, index) => {
      const name = f.name?.trim() || `Фильтр ${index + 1}`;

      if (f.type === "list" && f.values && f.values.length > 0) {
        filters.value.push({
          name,
          type: f.type,
          options: f.values
            .filter((v) => v)
            .map((v, i) => ({
              id: i,
              name: v,
              selected: false,
              count: 0,
            })),
        });
      } else if (f.type === "number") {
        filters.value.push({
          name,
          type: f.type,
          min: f.minValue,
          max: f.maxValue,
          inputMin: f.minValue,
          inputMax: f.maxValue,
        });
      } else {
        console.error(`Неизвестный тип фильтра: ${f.type}`);
      }

      if (name.toLowerCase().includes("категори")) {
        categories.value = f.values.map((v, i) => ({
          id: i,
          name: v,
          count: 0,
        }));
      }

      if (f.type === "number") {
        if (name.toLowerCase().includes("цен")) {
          priceMin.value = null;
          priceMax.value = f.maxValue;
        }
      }
    });
  } catch (error) {
    console.error("Ошибка при загрузке фильтров:", error);
  }
};

const fetchProducts = async () => {
  try {
    isLoading.value = true;
    const filtersPayload = [];

    filters.value.forEach((f) => {
      if (f.type === "list") {
        const selectedOptions = f.options.filter((o) => o.selected);

        if (selectedOptions.length == 0) return;

        filtersPayload.push({
          parameter: f.name,
          type: f.type,
          values: f.options.filter((o) => o.selected).map((o) => o.name),
        });
      } else if (f.type === "number") {
        if (f.inputMax == f.max && f.inputMin == f.min) {
          return;
        }
        filtersPayload.push({
          parameter: f.name,
          type: f.type,
          min: f.inputMin,
          max: f.inputMax,
        });
      }
    });

    const response = await api.post("/products/filter", {
      page: page.value - 1,
      filters: filtersPayload,
    });

    products.value = response.data.products || [];
    totalPages.value = response.data.totalPages || 1;
    isLoading.value = false;
  } catch (error) {
    console.error("Ошибка при фильтрации товаров:", error);
  }
};

const applyFilters = () => {
  page.value = 1;
  fetchProducts();
  isFiltersOpen.value = false;
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

// Функции для управления фильтрами
const openFilters = () => {
  isFiltersOpen.value = true;
};

const closeFilters = () => {
  isFiltersOpen.value = false;
  activeFilterSection.value = null;
};

const toggleFilterSection = (filterName) => {
  activeFilterSection.value =
    activeFilterSection.value === filterName ? null : filterName;
};

const toggleDesktopFilter = (filterName) => {
  if (desktopExpandedFilters.value.has(filterName)) {
    desktopExpandedFilters.value.delete(filterName);
  } else {
    desktopExpandedFilters.value.add(filterName);
  }
};

const clearAllFilters = () => {
  filters.value.forEach((filter) => {
    if (filter.type === "list") {
      filter.options.forEach((option) => {
        option.selected = false;
      });
    } else if (filter.type === "number") {
      filter.inputMin = filter.min;
      filter.inputMax = filter.max;
    }
  });
};

// Подсчет активных фильтров
const activeFiltersCount = () => {
  let count = 0;
  filters.value.forEach((filter) => {
    if (filter.type === "list") {
      count += filter.options.filter((option) => option.selected).length;
    } else if (filter.type === "number") {
      if (filter.inputMin !== filter.min || filter.inputMax !== filter.max) {
        count++;
      }
    }
  });
  return count;
};

// Получить список активных фильтров с названиями
const activeFiltersList = computed(() => {
  const activeFilters = [];

  filters.value.forEach((filter) => {
    if (filter.type === "list") {
      const selectedOptions = filter.options.filter(
        (option) => option.selected,
      );
      selectedOptions.forEach((option) => {
        activeFilters.push({
          filterName: filter.name,
          optionName: option.name,
          type: "list",
        });
      });
    } else if (filter.type === "number") {
      if (filter.inputMin !== filter.min || filter.inputMax !== filter.max) {
        activeFilters.push({
          filterName: filter.name,
          min: filter.inputMin,
          max: filter.inputMax,
          type: "number",
        });
      }
    }
  });

  return activeFilters;
});

// Удалить конкретный фильтр
const removeFilter = (filterToRemove) => {
  if (filterToRemove.type === "list") {
    const filter = filters.value.find(
      (f) => f.name === filterToRemove.filterName,
    );
    if (filter) {
      const option = filter.options.find(
        (o) => o.name === filterToRemove.optionName,
      );
      if (option) {
        option.selected = false;
      }
    }
  } else if (filterToRemove.type === "number") {
    const filter = filters.value.find(
      (f) => f.name === filterToRemove.filterName,
    );
    if (filter) {
      filter.inputMin = filter.min;
      filter.inputMax = filter.max;
    }
  }
};

// Получить текст для числового фильтра
const getNumberFilterText = (filter) => {
  if (filter.inputMin === filter.min && filter.inputMax === filter.max) {
    return `${filter.name}: все значения`;
  }
  if (filter.inputMin === filter.min) {
    return `${filter.name}: до ${filter.inputMax}`;
  }
  if (filter.inputMax === filter.max) {
    return `${filter.name}: от ${filter.inputMin}`;
  }
  return `${filter.name}: ${filter.inputMin} - ${filter.inputMax}`;
};

onMounted(async () => {
  await fetchFilters();
  await fetchProducts();
});
</script>

<template>
  <div class="pb-12">
    <div class="container mx-auto px-4">
      <!-- Кнопка открытия фильтров для мобильных -->
      <div class="mb-4 lg:hidden">
        <button
          @click="openFilters"
          class="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-gray-900 shadow-sm transition-colors hover:bg-gray-50"
        >
          <div class="flex items-center gap-2">
            <AdjustmentsHorizontalIcon class="size-5 text-blue-600" />
            <span class="font-medium">Фильтры</span>
            <span
              v-if="activeFiltersCount() > 0"
              class="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-2 py-1 text-xs text-white"
            >
              {{ activeFiltersCount() }}
            </span>
          </div>
          <svg
            class="size-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div class="flex flex-col gap-8 lg:flex-row">
        <!-- Боковая панель фильтров для десктопа -->
        <aside class="hidden flex-shrink-0 lg:block lg:w-80 xl:w-96">
          <div
            class="sticky top-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <!-- Заголовок с иконкой -->
            <div
              class="mb-6 flex items-center justify-between border-b border-gray-100 pb-4"
            >
              <div class="flex items-center gap-3">
                <div class="rounded-lg bg-blue-50 p-2">
                  <AdjustmentsHorizontalIcon class="text-accent size-5" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900">Фильтры</h2>
                  <p class="mt-1 text-sm text-gray-500">
                    Уточните параметры поиска
                  </p>
                </div>
              </div>
              <button
                v-if="activeFiltersCount() > 0"
                @click="clearAllFilters"
                class="text-accent rounded-lg px-3 py-1 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                Сбросить все
              </button>
            </div>

            <!-- Блок активных фильтров -->
            <div v-if="activeFiltersCount() > 0" class="mb-6">
              <div class="mb-3 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700"
                  >Активные фильтры:</span
                >
                <span
                  class="bg-accent flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold font-medium text-white"
                >
                  {{ activeFiltersCount() }}
                </span>
              </div>

              <!-- Список активных фильтров -->
              <div class="space-y-2">
                <div
                  v-for="(activeFilter, index) in activeFiltersList"
                  :key="index"
                  class="border-accent/30 bg-accent/10 flex items-center justify-between rounded-lg border px-3 py-2"
                >
                  <div class="flex min-w-0 flex-1 items-center gap-2">
                    <span class="text-accent truncate text-sm">
                      <template v-if="activeFilter.type === 'list'">
                        {{ activeFilter.filterName }}:
                        {{ activeFilter.optionName }}
                      </template>
                      <template v-else-if="activeFilter.type === 'number'">
                        {{
                          getNumberFilterText(
                            filters.find(
                              (f) => f.name === activeFilter.filterName,
                            ),
                          )
                        }}
                      </template>
                    </span>
                  </div>
                  <button
                    @click="removeFilter(activeFilter)"
                    class="btn btn-destructive btn-sm ml-2"
                  >
                    <XMarkIcon class="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Широкие выпадающие фильтры -->
            <div class="space-y-3">
              <div
                v-for="filter in filters"
                :key="filter.name"
                class="rounded-xl border border-gray-200 transition-colors hover:border-gray-300"
              >
                <!-- Кнопка для раскрытия фильтра -->
                <button
                  @click="toggleDesktopFilter(filter.name)"
                  class="flex w-full items-center justify-between rounded-xl p-4 text-left transition-all duration-200 hover:bg-gray-50"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-base font-semibold text-gray-900">
                      {{ filter.name }}
                      <span
                        v-if="
                          filter.type === 'list' &&
                          filter.options.filter((o) => o.selected).length > 0
                        "
                        class="ml-1 text-blue-600"
                      >
                        ({{ filter.options.filter((o) => o.selected).length }})
                      </span>
                    </span>
                  </div>
                  <ChevronDownIcon
                    class="size-5 text-gray-400 transition-transform duration-300"
                    :class="{
                      'rotate-180': desktopExpandedFilters.has(filter.name),
                    }"
                  />
                </button>

                <!-- Контент фильтра -->
                <div
                  v-if="desktopExpandedFilters.has(filter.name)"
                  class="rounded-b-xl border-t border-gray-100 bg-gray-50/50 px-4 pb-4"
                >
                  <!-- Список опций -->
                  <div v-if="filter.type == 'list'" class="mt-4">
                    <div class="custom-scrollbar max-h-72 overflow-y-auto pr-2">
                      <div class="space-y-3">
                        <label
                          v-for="option in filter.options"
                          :key="option.id"
                          class="flex cursor-pointer items-center rounded-lg border border-transparent p-3 transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm"
                          :class="{
                            'border-gray-200 bg-white shadow-sm':
                              option.selected,
                          }"
                        >
                          <input
                            type="checkbox"
                            class="mr-3 size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            :value="option.name"
                            v-model="option.selected"
                          />
                          <span
                            class="flex-1 text-sm font-medium text-gray-700"
                            >{{ option.name }}</span
                          >
                          <span
                            class="min-w-8 rounded-full bg-gray-100 px-2 py-1 text-center text-xs text-gray-400"
                          >
                            {{ option.count }}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Числовые поля -->
                  <div v-if="filter.type == 'number'" class="mt-4 space-y-4">
                    <div class="flex gap-3">
                      <div class="flex-1">
                        <label
                          class="mb-2 block text-xs font-medium text-gray-500"
                          >От</label
                        >
                        <input
                          type="number"
                          :placeholder="filter.min"
                          class="no-spinner w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                          v-model.number="filter.inputMin"
                        />
                      </div>
                      <div class="flex-1">
                        <label
                          class="mb-2 block text-xs font-medium text-gray-500"
                          >До</label
                        >
                        <input
                          type="number"
                          :placeholder="filter.max"
                          class="no-spinner w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                          v-model.number="filter.inputMax"
                        />
                      </div>
                    </div>
                    <!-- Диапазон значений -->
                    <div class="text-center text-xs text-gray-500">
                      Диапазон: {{ filter.min }} - {{ filter.max }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Кнопка применения -->
            <button
              @click="applyFilters"
              class="bg-accent group mt-6 flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
            >
              <AdjustmentsHorizontalIcon
                class="size-5 text-white transition-transform group-hover:scale-110"
              />
              <span>Применить фильтры</span>
              <span
                v-if="activeFiltersCount() > 0"
                class="min-w-6 rounded-full bg-white px-2 py-1 text-xs font-bold text-blue-600"
              >
                {{ activeFiltersCount() }}
              </span>
            </button>
          </div>
        </aside>

        <!-- Мобильная панель фильтров -->
        <div v-if="isFiltersOpen" class="fixed inset-0 z-50 lg:hidden">
          <!-- Затемненный фон -->
          <div
            class="bg-opacity-50 absolute inset-0 bg-black"
            @click="closeFilters"
          ></div>

          <!-- Панель фильтров -->
          <div
            class="absolute top-0 right-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform"
          >
            <div class="flex h-full flex-col">
              <!-- Заголовок -->
              <div
                class="flex items-center justify-between border-b border-gray-200 bg-white p-6"
              >
                <div class="flex items-center gap-3">
                  <AdjustmentsHorizontalIcon class="size-6 text-blue-600" />
                  <div>
                    <h2 class="text-xl font-bold text-gray-900">Фильтры</h2>
                    <p class="text-sm text-gray-500">Настройте параметры</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    v-if="activeFiltersCount() > 0"
                    @click="clearAllFilters"
                    class="rounded-lg px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Сбросить все
                  </button>
                  <button
                    @click="closeFilters"
                    class="rounded-lg p-2 transition-colors hover:bg-gray-100"
                  >
                    <XMarkIcon class="size-6" />
                  </button>
                </div>
              </div>

              <!-- Блок активных фильтров для мобильной версии -->
              <div v-if="activeFiltersCount() > 0" class="mx-6 mt-4">
                <div class="mb-3 flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700"
                    >Активные фильтры:</span
                  >
                  <span
                    class="rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white"
                  >
                    {{ activeFiltersCount() }}
                  </span>
                </div>

                <!-- Список активных фильтров -->
                <div class="mb-4 space-y-2">
                  <div
                    v-for="(activeFilter, index) in activeFiltersList"
                    :key="index"
                    class="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 px-3 py-2"
                  >
                    <div class="flex min-w-0 flex-1 items-center gap-2">
                      <span class="truncate text-sm text-blue-800">
                        <template v-if="activeFilter.type === 'list'">
                          {{ activeFilter.filterName }}:
                          {{ activeFilter.optionName }}
                        </template>
                        <template v-else-if="activeFilter.type === 'number'">
                          {{
                            getNumberFilterText(
                              filters.find(
                                (f) => f.name === activeFilter.filterName,
                              ),
                            )
                          }}
                        </template>
                      </span>
                    </div>
                    <button
                      @click="removeFilter(activeFilter)"
                      class="ml-2 flex-shrink-0 rounded p-1 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
                    >
                      <XMarkIcon class="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Список фильтров -->
              <div class="flex-1 overflow-y-auto py-4">
                <div
                  v-for="filter in filters"
                  :key="filter.name"
                  class="mx-6 mb-4 rounded-xl border border-gray-200"
                >
                  <!-- Заголовок секции фильтра -->
                  <button
                    @click="toggleFilterSection(filter.name)"
                    class="flex w-full items-center justify-between rounded-xl p-4 text-left transition-colors hover:bg-gray-50"
                  >
                    <div class="flex items-center gap-3">
                      <span class="font-semibold text-gray-900">{{
                        filter.name
                      }}</span>
                      <span
                        v-if="
                          filter.type === 'list' &&
                          filter.options.filter((o) => o.selected).length > 0
                        "
                        class="rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white"
                      >
                        {{ filter.options.filter((o) => o.selected).length }}
                      </span>
                    </div>
                    <svg
                      class="size-5 text-gray-400 transition-transform duration-300"
                      :class="{
                        'rotate-90': activeFilterSection === filter.name,
                      }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <!-- Контент секции фильтра -->
                  <div
                    v-if="activeFilterSection === filter.name"
                    class="rounded-b-xl bg-gray-50/50 px-4 pb-4"
                  >
                    <!-- Список опций -->
                    <div v-if="filter.type == 'list'" class="mt-3">
                      <div
                        class="custom-scrollbar max-h-60 overflow-y-auto pr-2"
                      >
                        <div class="space-y-2">
                          <label
                            v-for="option in filter.options"
                            :key="option.id"
                            class="flex cursor-pointer items-center rounded-lg border border-transparent p-3 transition-all hover:border-gray-200 hover:bg-white"
                            :class="{
                              'border-gray-200 bg-white': option.selected,
                            }"
                          >
                            <input
                              type="checkbox"
                              class="mr-3 size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              :value="option.name"
                              v-model="option.selected"
                            />
                            <span class="flex-1 font-medium text-gray-700">{{
                              option.name
                            }}</span>
                            <span
                              class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-400"
                            >
                              {{ option.count }}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <!-- Числовые поля -->
                    <div v-if="filter.type == 'number'" class="mt-3 space-y-3">
                      <div class="flex gap-3">
                        <div class="flex-1">
                          <label
                            class="mb-2 block text-xs font-medium text-gray-500"
                            >От</label
                          >
                          <input
                            type="number"
                            :placeholder="filter.min"
                            class="no-spinner w-full rounded-lg border border-gray-300 px-3 py-2 text-base"
                            v-model.number="filter.inputMin"
                          />
                        </div>
                        <div class="flex-1">
                          <label
                            class="mb-2 block text-xs font-medium text-gray-500"
                            >До</label
                          >
                          <input
                            type="number"
                            :placeholder="filter.max"
                            class="no-spinner w-full rounded-lg border border-gray-300 px-3 py-2 text-base"
                            v-model.number="filter.inputMax"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Кнопка применения -->
              <div class="border-t border-gray-200 bg-white p-6 pb-8">
                <button
                  @click="applyFilters"
                  class="btn btn-accent btn-lg bg-accent hover:bg-accent/80 mb-12 flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-semibold text-white shadow-sm transition-all duration-200"
                >
                  <AdjustmentsHorizontalIcon class="size-5 text-white" />
                  <span>Показать результаты</span>
                  <span
                    v-if="activeFiltersCount() > 0"
                    class="text-accent min-w-6 rounded-full bg-white px-2 py-1 text-xs font-bold"
                  >
                    {{ activeFiltersCount() }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

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
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
