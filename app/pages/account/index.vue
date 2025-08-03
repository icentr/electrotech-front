<script setup>
import { ref, onMounted } from "vue";
import { getApi } from "@/api";

const api = getApi();

import { CheckIcon, XMarkIcon, ExclamationTriangleIcon } from "@heroicons/vue/16/solid";

useHead({
    title:"Аккаунт"
})
// Данные пользователя
const user = ref({
    name: "",
    email: "",
    phone: "",
    
});

const auth = useAuthStore();

onMounted(async () => {
    try {
        const { data } = await api.post("/user/get-data");

        user.value.name = [data.surname, data.first_name, data.last_name].filter(Boolean).join(" ");
        user.value.email = data.email;
        user.value.phone = data.phone_number;
    } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
    }

    try {
        const { data } = await api.post("/user/get-company-data");

        company.value.name = data.companyName;
        company.value.inn = data.companyINN;
        company.value.address = data.companyAddress;
        company.value.position = data.positionInCompany;

        company.value.allRequiredFields = data.allRequiredFields;
    } catch (error) {
        console.error("Ошибка при получении данных компании: " + error);
    }
    try {
        const { data } = await api.get("/orders/get");

        orders.value = data.orders.map((order) => {
    const rawDate = order.createdAt;
    const isoDate = rawDate
      .split(' ')[0] + 'T' + rawDate.split(' ')[1]; // Преобразуем в ISO формат

    const amount = order.products.reduce((sum, p) => sum + p.quantity * p.price, 0);

    return {
        id: order.id,
        date: isoDate,
        amount,
        status: "Завершен", // Заглушка пока
    };
});
    } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
    }
});

// Данные компании
const company = ref({
    name: "",
    inn: "",
    address: "",
    position: "",
    allRequiredFields: false,
});

// История заказов
const orders = ref([]);

// Форматирование даты
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
};


// Форматирование валюты
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
    }).format(amount);
};

// Классы для статусов заказов
const getStatusClass = (status) => {
    switch (status) {
        case "Новый":
            return "bg-blue-100 text-blue-800";
        case "В обработке":
            return "bg-yellow-100 text-yellow-800";
        case "Доставка":
            return "bg-purple-100 text-purple-800";
        case "Завершен":
            return "bg-green-100 text-green-800";
        case "Отменен":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

// Повторить заказ
const repeatOrder = (orderId) => {
    console.log(`Повтор заказа #${orderId}`);
    // Здесь будет логика повторения заказа
};
</script>
<!-- src/views/Account.vue -->
<template>
    <div class="bg-gray-50 min-h-screen pb-12">
        <!-- Хлебные крошки -->
        <Breadcrumbs :page="'Личный кабинет'" />

        <!-- Основной контент -->
        <div class="container mx-auto px-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">Личный кабинет</h1>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Левая колонка - информация о пользователе и компании -->
                <div class="lg:col-span-1 space-y-6">
                    <!-- Карточка пользователя -->
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div class="flex flex-col items-center mb-6">
                            <div class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                                <i class="fas fa-user text-blue-600 text-3xl"></i>
                            </div>
                            <h2 class="text-xl font-bold text-gray-900">{{ user.name }}</h2>
                            <p class="text-gray-500">{{ user.position }}</p>
                        </div>

                        <div class="space-y-4">
                            <div class="flex items-start">
                                <div class="bg-blue-50 rounded-lg w-10 h-10 flex items-center justify-center mr-4 text-blue-600">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Email</p>
                                    <p class="font-medium">{{ user.email }}</p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="bg-blue-50 rounded-lg w-10 h-10 flex items-center justify-center mr-4 text-blue-600">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Телефон</p>
                                    <p class="font-medium">{{ user.phone || "Не указан" }}</p>
                                </div>
                            </div>

                            <RouterLink
                                to="/account/edit"
                                class="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                                <i class="fas fa-edit mr-2"></i> Редактировать профиль
                            </RouterLink>
                        </div>
                    </div>

                    <!-- Карточка компании -->
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div class="flex items-center mb-6">
                            <div class="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mr-4 text-blue-600">
                                <i class="fas fa-building"></i>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-gray-900">Информация о компании</h2>
                                <p class="ps-0 p-0 text-red-400 font-normal text-sm flex gap-1" v-if="!company.allRequiredFields">
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

                            <RouterLink
                                to="/account/EditCompany"
                                class="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                                <i class="fas fa-edit mr-2"></i> Редактировать компанию
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <!-- Правая колонка - история заказов -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-bold text-gray-900">История заказов</h2>
                            <!-- <button class="text-blue-600 hover:text-blue-800 font-medium flex items-center"><i class="fas fa-file-export mr-2"></i> Экспорт в Excel</button> -->
                        </div>

                        <!-- Фильтры -->
                        <!-- <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
                            <div class="relative flex-1">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i class="fas fa-search text-gray-400"></i>
                                </div>
                                <input
                                    type="text"
                                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Поиск по заказам..." />
                            </div>

                            <div class="flex space-x-4">
                                <select class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option>Все статусы</option>
                                    <option>Новый</option>
                                    <option>В обработке</option>
                                    <option>Доставка</option>
                                    <option>Завершен</option>
                                    <option>Отменен</option>
                                </select>

                                <select class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option>За последние 3 месяца</option>
                                    <option>За последние 6 месяцев</option>
                                    <option>За последний год</option>
                                    <option>За все время</option>
                                </select>
                            </div>
                        </div> -->

                        <!-- Таблица заказов -->
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№ заказа</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                                        <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th> -->
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                            <RouterLink :to="`/orders/${order.id}`" class="hover:underline">#{{ order.id }}</RouterLink>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ formatDate(order.date) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {{ formatCurrency(order.amount) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`">
                                                {{ order.status }}
                                            </span>
                                        </td>
                                        <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <RouterLink :to="`/orders/${order.id}`" class="text-blue-600 hover:text-blue-900 mr-4">
                                                <i class="fas fa-eye"></i>
                                            </RouterLink>
                                            <button class="text-blue-600 hover:text-blue-900" @click="repeatOrder(order.id)">
                                                <i class="fas fa-redo"></i>
                                            </button>
                                        </td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Пагинация -->
                        <!-- <div class="flex items-center justify-between mt-6">
                            <div class="text-sm text-gray-500">Показано с <span class="font-medium">1</span> по <span class="font-medium">5</span> из <span class="font-medium">12</span> заказов</div>
                            <div class="flex space-x-2">
                                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button class="px-3 py-1 rounded-lg border border-blue-500 bg-blue-50 text-blue-600 font-medium">1</button>
                                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">2</button>
                                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">3</button>
                                <button class="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div> -->
                    </div>

                  
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Дополнительные стили, если нужно */
</style>
