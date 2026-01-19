<script setup>
import { getApi } from "@/api";
import { onMounted, ref } from "vue";
import { DOCS } from "~/data";

const api = getApi();

import { formatCurrency } from "@/utils";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  PhoneXMarkIcon,
} from "@heroicons/vue/16/solid";
import { DocumentIcon, PencilIcon } from "@heroicons/vue/24/outline";
usePageTitle("Аккаунт");
// Данные пользователя
const user = ref({
  name: "",
  email: "",
  phone: "",
});
// Данные компании
const company = ref({
  name: "",
  inn: "",
  address: "",
  position: "",
  okpo: "",
  allRequiredFields: false,
});

const auth = useAuthStore();
const cart = useCartStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  cart.clearCart();
  router.push("/login");
};
onMounted(async () => {
  try {
    const { data } = await api.post("/user/get-data");

    user.value.name = [data.surname, data.first_name, data.last_name]
      .filter(Boolean)
      .join(" ");
    user.value.email = data.email;
    user.value.phone = data.phone_number;
    user.value.avatarUrl = data.avatarUrl;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
  }

  try {
    const { data } = await api.post("/user/get-company-data");

    company.value.name = data.companyName;
    company.value.inn = data.companyInn;
    company.value.address = data.companyAddress;
    company.value.position = data.positionInCompany;
    company.value.okpo = data.companyOkpo;
    company.value.allRequiredFields = data.allRequiredFields;
  } catch (error) {
    console.error("Ошибка при получении данных компании: " + error);
  }
  try {
    const { data } = await api.get("/orders/get");

    console.log(data);
    orders.value = data.orders.map((order) => {
      const amount = order.products.reduce(
        (sum, p) => sum + p.quantity * p.productPrice,
        0,
      );

      return {
        id: order.id,
        creationDate: order.creationDate,
        amount,
      };
    });
    // orders.value = data.orders;
  } catch (error) {
    console.error("Ошибка при загрузке заказов:", error);
  }
});

// История заказов
const orders = ref([]);

// Форматирование даты
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("ru-RU", options);
};

// Классы для статусов заказов
</script>
<template>
  <BreadcrumbsBlock page="Личный кабинет" />
  <div class="min-h-screen bg-gray-50">
    <!-- Основной контент -->
    <div class="container mx-auto px-4">
      <h1 class="mb-8 text-3xl font-bold text-gray-900">Личный кабинет</h1>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Левая колонка - информация о пользователе и компании -->
        <div class="space-y-6 lg:col-span-1">
          <!-- Карточка пользователя -->
          <div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div class="mb-6 flex flex-col items-center">
              <div
                class="bg-accent/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full"
              >
                <img
                  v-if="user.avatarUrl"
                  loading="lazy"
                  :src="user.avatarUrl"
                  class="h-20 w-20 rounded-full"
                  alt=""
                />
              </div>
              <h2 class="text-xl font-bold text-gray-900">{{ user.name }}</h2>
              <p class="text-gray-500">{{ user.position }}</p>
            </div>

            <div class="space-y-4">
              <div class="flex items-start">
                <div
                  class="bg-accent/10 text-accent mr-4 flex h-10 w-10 items-center justify-center rounded-lg"
                >
                  <EnvelopeIcon class="size-6" />
                </div>
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="font-medium">{{ user.email }}</p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="bg-accent/10 text-accent mr-4 flex h-10 w-10 items-center justify-center rounded-lg"
                >
                  <PhoneIcon v-if="user.phone" class="size-6" />
                  <PhoneXMarkIcon v-else class="size-6" />
                </div>
                <div>
                  <p class="text-sm text-gray-500">Телефон</p>
                  <p class="font-medium">{{ user.phone || "Не указан" }}</p>
                </div>
              </div>
              <RouterLink to="/account/edit" class="btn mt-6">
                <PencilIcon class="size-5" />
                Редактировать профиль
              </RouterLink>
            </div>
          </div>
          <div class="flex">
            <button @click="handleLogout" class="btn btn-destructive btn-lg">
              <ArrowLeftStartOnRectangleIcon class="size-6" />
              Выйти из аккаунта
            </button>
          </div>
          <!-- Карточка компании -->
          <div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div class="mb-6 flex items-center">
              <div
                class="text-accent bg-accent/10 mr-4 flex h-12 w-12 items-center justify-center rounded-lg"
              >
                <BuildingOfficeIcon class="size-6" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">
                  Информация о компании
                </h2>
                <p
                  class="flex gap-1 p-0 ps-0 text-sm font-normal text-red-400"
                  v-if="!company.allRequiredFields"
                >
                  <ExclamationTriangleIcon class="size-5 p-0" />
                  Данные не заполнены
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-500">Название компании</p>
                <p class="font-medium">
                  <span v-if="company.name">
                    {{ company.name }}
                  </span>
                  <span v-else> -- </span>
                </p>
              </div>

              <div>
                <p class="text-sm text-gray-500">ИНН</p>
                <p class="font-medium">
                  <span v-if="company.inn">
                    {{ company.inn }}
                  </span>
                  <span v-else> -- </span>
                </p>
              </div>

              <div>
                <p class="text-sm text-gray-500">Должность</p>
                <p class="font-medium">
                  <span v-if="company.position"> {{ company.position }}</span>
                  <span v-else> -- </span>
                </p>
              </div>

              <div>
                <p class="text-sm text-gray-500">Юридический адрес</p>
                <p class="font-medium">
                  <span v-if="company.address">{{ company.address }}</span>
                  <span v-else> -- </span>
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">ОКПО</p>
                <p class="font-medium">
                  <span v-if="company.okpo">{{ company.okpo }}</span>
                  <span v-else> -- </span>
                </p>
              </div>

              <RouterLink to="/account/EditCompany" class="btn mt-6 flex">
                <PencilIcon class="size-5" />
                Редактировать компанию
              </RouterLink>
            </div>
          </div>
          <div
            class="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div class="mb-5 flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">Документы</h2>
            </div>
            <RouterLink class="btn" :to="DOCS.privacyPolicy.link">
              Политика конфиденциальности
              <ArrowUpRightIcon class="size-5" />
            </RouterLink>
            <RouterLink
              class="btn"
              :to="DOCS.userAgreement.link"
              v-if="DOCS.userAgreement.enabled"
            >
              Пользовательское соглашение
              <ArrowUpRightIcon class="size-5" />
            </RouterLink>

            <RouterLink class="btn btn-accent-outline mt-5" to="/docs"
              >Все документы <DocumentIcon class="size-5" />
            </RouterLink>
          </div>
        </div>

        <!-- Правая колонка - история заказов -->
        <div class="lg:col-span-2">
          <div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">История заказов</h2>
            </div>

            <!-- Таблица заказов -->
            <div class="overflow-x-auto rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      № заказа
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Дата
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Сумма
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    ></th>
                    <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th> -->
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="order in orders.sort((a, b) => b.id - a.id)"
                    :key="order.id"
                    class="hover:bg-gray-50"
                  >
                    <td
                      class="px-1 py-4 text-sm font-medium whitespace-nowrap md:px-6"
                    >
                      #{{ order.id }}
                    </td>
                    <td
                      class="px-1 py-4 text-sm whitespace-nowrap text-gray-500 md:px-6"
                    >
                      {{ formatDate(order.creationDate) }}
                    </td>
                    <td
                      class="px-1 py-4 text-sm whitespace-nowrap text-gray-900 md:px-6"
                    >
                      {{ formatCurrency(order.amount) }}
                    </td>
                    <td class="px-1 py-4 whitespace-nowrap md:px-6">
                      <RouterLink :to="`/orders/${order.id}`" class="btn"
                        >Подробнее
                        <ArrowRightIcon class="size-4" />
                      </RouterLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Пагинация -->
            <!-- <div class="flex items-center justify-between mt-6">
                            <div class="text-sm text-gray-500">Показано с <span class="font-medium">1</span> по <span class="font-medium">5</span> из <span class="font-medium">12</span> заказов</div>
                            <div class="flex space-x-2">
                                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                                </button>
                                <button class="px-3 py-1 rounded-lg border border-blue-500 bg-blue-50 text-blue-600 font-medium">1</button>
                                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">2</button>
                                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">3</button>
                                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                                </button>
                            </div>
                        </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
