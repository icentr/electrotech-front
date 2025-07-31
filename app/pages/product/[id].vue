<!-- src/pages/product/[id].vue -->
<template>
  <Breadcrumbs
    :breadcrumbs="[{ name: 'Каталог', url: '/catalog' }]"
     :page="product?.name || 'Загрузка...'" />
  />
  <div class="pb-12" v-if="product">
    <div class="container mx-auto px-4" v-if="product">
      <!-- Хлебные крошки -->

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Основная информация о товаре -->
        <div class="">
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Изображение товара -->
              <div class="md:w-1/3">
                <div
                  class="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64"
                >
                  <img
                    :src="getImageUrl(product.imagePath)"
                    :alt="product.name"
                    class="max-h-full object-contain w-full"
                  />
                </div>
              </div>

              <!-- Основные характеристики -->
              <div class="md:w-2/3">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">
                  {{ product.name }}
                </h1>
                <span class="text-sm text-gray-500"
                  >Артикул: {{ product.articleNumber }}</span
                >

                <div class="flex items-center mb-4">
                  <div class="flex text-yellow-400 mr-2">
                    <i
                      class="fas fa-star"
                      v-for="i in 5"
                      :key="i"
                      :class="{ 'text-gray-300': i > product.rating }"
                    ></i>
                  </div>
                </div>

                <div class="mb-6">
                  <div class="flex items-baseline mb-2">
                    <span class="text-3xl font-bold text-gray-900 mr-3"
                      >{{ product.price }} ₽</span
                    >

                    <span
                      v-if="product.oldPrice"
                      class="text-lg text-gray-500 line-through"
                      >{{ product.oldPrice }} ₽</span
                    >
                    <span
                      v-if="product.oldPrice"
                      class="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded"
                      >-{{
                        Math.round(
                          (1 -
                            parseFloat(product.price.replace(/\s/g, "")) /
                              parseFloat(product.oldPrice.replace(/\s/g, ""))) *
                            100
                        )
                      }}%</span
                    >
                  </div>

                  <div
                    class="text-green-600 text-sm font-medium"
                    v-if="product.count > 0"
                  >
                    В наличии ({{ product.count }} шт.)
                  </div>
                  <div class="text-gray-500 text-sm" v-else>Под заказ</div>
                </div>

                <!-- Ключевые преимущества -->
                <!-- <div class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">
                    Ключевые преимущества:
                  </h3>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>Высокая эффективность (КПД 90%)</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span
                        >Надежная защита от перегрузок и короткого
                        замыкания</span
                      >
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>Компактные габариты для удобного монтажа</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>Длительный срок службы (до 50 000 часов)</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span
                        >Широкий диапазон входного напряжения (110-240В)</span
                      >
                    </li>
                  </ul>
                </div> -->

                <!-- Кнопки действий -->
                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    :disabled="product.count === 0"
                    class="relative z-20 w-full bg-blue-600 disabled:bg-blue-200 disabled:text-blue-50 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                    @click="addToCart"
                  >
                    <i class="fas fa-shopping-cart mr-2"></i>
                    В корзину
                  </button>
                </div>

                <!-- Контакты менеджера -->
                <!-- <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div class="flex items-start">
                    <div class="bg-blue-100 p-2 rounded-full mr-3">
                      <i class="fas fa-headset text-blue-600"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-semibold text-gray-900 mb-1">
                        Есть вопросы по товару?
                      </h3>
                      <p class="text-sm text-gray-600 mb-3">
                        Наш менеджер поможет вам с выбором и ответит на все
                        вопросы
                      </p>
                      <a
                        href="tel:+78001234567"
                        class="bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors inline-flex items-center"
                      >
                        <i class="fas fa-phone-alt mr-2"></i>
                        Позвонить менеджеру
                      </a>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>

          <!-- Подробное описание и характеристики -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Описание товара
            </h2>
            <p class="text-gray-700 mb-6">{{ product.description }}</p>

            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Технические характеристики
            </h2>
            <div
              class="flex justify-between border-b border-gray-100 py-2"
              v-for="(param, index) in product.parameters"
              :key="index"
            >
              <span class="text-gray-600">{{ param.name }}</span>
              <span class="text-gray-900 font-medium">
                {{
                  param.stringValue ||
                  param.numberValue ||
                  (param.sliceValue ? param.sliceValue.join(", ") : "")
                }}
              </span>
            </div>
            <div class="flex justify-between border-b border-gray-100 py-2">
              <p class="text-gray-600">Производитель</p>
              <p class="text-gray-900">{{ product.manufacturer }}</p>
            </div>
          </div>
        </div>

        <!-- Боковая панель -->
        <!-- <div class="lg:w-1/3">
           Доставка и оплата 
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-4">
            <h2 class="text-lg font-bold text-gray-900 mb-4">
              Доставка и оплата
            </h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-3">
                  <i class="fas fa-truck text-blue-600"></i>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-1">
                    Доставка по Москве
                  </h3>
                  <p class="text-sm text-gray-600">
                    Курьером - 300₽, бесплатно от 5000₽
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-3">
                  <i class="fas fa-boxes text-blue-600"></i>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-1">
                    Самовывоз
                  </h3>
                  <p class="text-sm text-gray-600">
                    Бесплатно из нашего магазина
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-3">
                  <i class="fas fa-credit-card text-blue-600"></i>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-1">
                    Способы оплаты
                  </h3>
                  <p class="text-sm text-gray-600">
                    Наличные, карта, безналичный расчет
                  </p>
                </div>
              </div>
            </div>
          </div>

          Похожие товары 
          <div class="bg-white rounded-lg shadow-sm p-6">
                        <h2 class="text-lg font-bold text-gray-900 mb-4">Вам может понравиться</h2>
                        <div class="space-y-4">
                            <div class="flex items-center border-b border-gray-100 pb-4">
                                <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                    <img src="https://via.placeholder.com/80x80/1e3a8a/ffffff?text=LED+54W" alt="LED-драйвер 54Вт" class="max-h-full" />
                                </div>
                                <div>
                                    <RouterLink to="/catalog/2" class="text-sm font-medium text-gray-900 mb-1 hover:text-blue-600">LED-драйвер Gigant 54Вт</RouterLink>
                                    <p class="text-sm text-gray-600 mb-1">5 290 ₽</p>
                                    <button class="text-xs text-blue-600 hover:text-blue-800">В корзину</button>
                                </div>
                            </div>
                            <div class="flex items-center border-b border-gray-100 pb-4">
                                <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                    <img src="https://via.placeholder.com/80x80/1e3a8a/ffffff?text=LED+24W" alt="LED-драйвер 24Вт" class="max-h-full" />
                                </div>
                                <div>
                                    <RouterLink to="/catalog/3" class="text-sm font-medium text-gray-900 mb-1 hover:text-blue-600">LED-драйвер Gigant 24Вт</RouterLink>
                                    <p class="text-sm text-gray-600 mb-1">2 990 ₽</p>
                                    <button class="text-xs text-blue-600 hover:text-blue-800">В корзину</button>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                    <img src="https://via.placeholder.com/80x80/1e3a8a/ffffff?text=LED+72W" alt="LED-драйвер 72Вт" class="max-h-full" />
                                </div>
                                <div>
                                    <RouterLink to="/catalog/4" class="text-sm font-medium text-gray-900 mb-1 hover:text-blue-600">LED-драйвер Gigant 72Вт</RouterLink>
                                    <p class="text-sm text-gray-600 mb-1">6 890 ₽</p>
                                    <button class="text-xs text-blue-600 hover:text-blue-800">В корзину</button>
                                </div>
                            </div>
                        </div>
                    </div> 
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api, { getImageUrl } from "@/api";
import { useCartStore } from "@/stores/cart";
// import { useToast } from "vue-toastification"; // если используешь уведомления

const route = useRoute();
const product = ref();
const loading = ref(true);
const error = ref(null);

const cartStore = useCartStore();
// const toast = useToast(); // если используешь уведомления

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

</script>
