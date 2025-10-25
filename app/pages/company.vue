<script setup>
useHead({
    title: "О Компании",
});

import { ArchiveBoxIcon, ClockIcon, DocumentDuplicateIcon, DocumentTextIcon, EnvelopeIcon, MapPinIcon, PercentBadgeIcon, PhoneIcon, TruckIcon, UserGroupIcon } from "@heroicons/vue/16/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import { PHONE_NUMBER, PHONE_NUMBER_NORMALIZED, EMAIL, COMPANY_NAME, ADDRESS } from "~/data";
</script>
<template>
    <div class="bg-gray-50 antialiased">
        <!-- Верхняя панель с контактами -->

        <!-- О компании -->
        <section class="py-16">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">
                    О компании
                    <span class="text-black">
                        {{ COMPANY_NAME }}
                    </span>
                </h2>
                <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
            <div class="flex flex-col md:flex-row">
                <div class="px-4 md:w-1/2">
                    <div class="flex flex-col items-center">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-6">Наша миссия</h3>
                            <p class="text-gray-600 mb-6 text-lg leading-relaxed text-balance">
                                Компания
                                <span class="font-semibold">
                                    {{ COMPANY_NAME }}
                                </span>
                                уже более 10 лет является надежным поставщиком электротехнических компонентов для промышленных предприятий. Мы специализируемся проектирование и сборка НКУ любой
                                сложности и конфигурации.
                                <a class="transition-all duration-200 text-accent hover:text-blue-800 hover:underline active:underline" href="https://icentr.pro/" target="_blank">
                                    Наш сайт
                                    <ArrowTopRightOnSquareIcon class="inline size-5 pb-1" />
                                </a>
                            </p>
                            <p class="text-gray-600 mb-6 text-lg leading-relaxed">
                                Наша цель - обеспечить предприятия качественными электротехническими компонентами, сократив их затраты на поиск и закупку оборудования.
                            </p>
                            <div class="flex flex-wrap gap-4">
                                <div class="bg-accent text-white px-4 py-2 rounded-full">Собственный склад</div>
                                <div class="bg-accent text-white px-4 py-2 rounded-full">Оригинальные компоненты</div>
                                <div class="bg-accent text-white px-4 py-2 rounded-full">Техническая поддержка</div>
                                <a
                                    href="https://icentr.pro"
                                    target="_blank"
                                    class="bg-accent hover:bg-accent/90 hover:scale-110 transition-all duration-150 active:scale-105 text-white px-4 py-2 rounded-full flex gap-2 items-center">
                                    Собственное производство
                                    <ArrowTopRightOnSquareIcon class="size-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <CompanyCarousel class="md:w-1/2" />
            </div>
        </section>

        <!-- Наши преимущества -->
        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">НАШИ ПРЕИМУЩЕСТВА</h2>
                    <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div class="text-accent text-4xl mb-4">
                            <ArchiveBoxIcon class="size-8" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900">Собственный склад</h3>
                        <p class="text-gray-600">Более 5000 наименований товаров в наличии на собственном складе в Москве</p>
                    </div>

                    <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div class="text-accent text-4xl mb-4">
                            <DocumentTextIcon class="size-8" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900">Оригинальная продукция</h3>
                        <p class="text-gray-600">Работаем только с официальными поставщиками, гарантируем подлинность продукции</p>
                    </div>

                    <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div class="text-accent text-4xl mb-4">
                            <TruckIcon class="size-8" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900">Быстрая доставка</h3>
                        <p class="text-gray-600">Доставка по Москве в день заказа, по России - от 1 дня</p>
                    </div>

                    <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div class="text-accent text-4xl mb-4">
                            <PercentBadgeIcon class="size-8" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900">Гибкие условия</h3>
                        <p class="text-gray-600">Индивидуальные условия для оптовых покупателей и постоянных клиентов</p>
                    </div>

                    <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div class="text-accent text-4xl mb-4">
                            <UserGroupIcon class="size-8" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900">Техническая поддержка</h3>
                        <p class="text-gray-600">Консультации по подбору оборудования и технические консультации</p>
                    </div>

                    <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div class="text-accent text-4xl mb-4">
                            <DocumentDuplicateIcon class="size-8" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900">Полный пакет документов</h3>
                        <p class="text-gray-600">Предоставляем все необходимые документы, включая сертификаты и декларации</p>
                    </div>
                </div>
            </div>
        </section>
        <!-- Карта с местоположением -->
        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">КАК НАС НАЙТИ</h2>
                    <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Контакты</h3>
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                    <MapPinIcon class="text-accent size-6" />
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900 mb-1">Адрес</h4>
                                    <p class="text-gray-600">
                                        {{ ADDRESS }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                    <PhoneIcon class="text-accent size-6" />
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900 mb-1">Телефон</h4>
                                    <a :href="'tel:' + PHONE_NUMBER_NORMALIZED" class="text-gray-600">{{ PHONE_NUMBER }}</a>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                    <EnvelopeIcon class="text-accent size-6" />
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900 mb-1">Email</h4>
                                    <p class="text-gray-600">{{ EMAIL }}</p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                    <ClockIcon class="text-accent size-6" />
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900 mb-1">Режим работы</h4>
                                    <p class="text-gray-600">Пн-Пт: 9:00-18:00<br />Сб-Вс: выходной</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="h-96 rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A2f57d74ae9e3bebc9d78f87bc8cfb77f24c313897c3ab5eaf13562d430075cfe&amp;source=constructor"
                            width="653"
                            height="506"
                            frameborder="0"></iframe>
                    </div>
                </div>
            </div>
        </section>

        <!-- Форма обратной связи -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div class="md:flex">
                        <div class="md:w-1/2 bg-accent text-white p-10">
                            <h2 class="text-2xl font-bold mb-4">ОСТАЛИСЬ ВОПРОСЫ?</h2>
                            <p class="mb-6 opacity-90">Напишите нам, и мы свяжемся с вами в ближайшее время</p>

                            <div class="space-y-5">
                                <div class="flex items-start">
                                    <div class="bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                        <PhoneIcon class="text-accent size-5" />
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-sm text-blue-200">Телефон</h3>
                                        <a :href="'tel:' + PHONE_NUMBER_NORMALIZED" class="text-lg font-medium hover:underline">{{ PHONE_NUMBER }}</a>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                        <i class="fas fa-envelope"></i>
                                        <EnvelopeIcon class="text-accent size-5" />
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-sm text-blue-200">Email</h3>
                                        <a :href="'mailto:' + EMAIL" class="text-lg font-medium hover:underline">{{ EMAIL }}</a>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                        <MapPinIcon class="text-accent size-5" />
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-sm text-blue-200">Адрес</h3>
                                        <p class="text-sm font-medium">
                                            {{ ADDRESS }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="md:w-1/2 p-10">
                            <form>
                                <div class="mb-5">
                                    <label for="name" class="block text-gray-700 mb-2 font-medium">Ваше имя*</label>
                                    <input
                                        type="text"
                                        id="name"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition"
                                        required />
                                </div>
                                <div class="mb-5">
                                    <label for="phone" class="block text-gray-700 mb-2 font-medium">Телефон*</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition"
                                        required />
                                </div>
                                <div class="mb-5">
                                    <label for="email" class="block text-gray-700 mb-2 font-medium">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition" />
                                </div>
                                <div class="mb-6">
                                    <label for="message" class="block text-gray-700 mb-2 font-medium">Сообщение</label>
                                    <textarea
                                        id="message"
                                        rows="3"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition"
                                        placeholder="Ваш вопрос..."></textarea>
                                </div>
                                <button type="submit" class="w-full bg-accent text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
                                    Отправить сообщение
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

body {
    font-family: "Inter", sans-serif;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.pulse-animation {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }

    70% {
        box-shadow: 0 0 0 12px rgba(59, 130, 246, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
}

.shadow-hard {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
}
</style>
