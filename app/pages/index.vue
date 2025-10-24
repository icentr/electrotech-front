<script setup>
useHead({
    title: "ЭлектроТех",
});
import {
    ArchiveBoxIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    CpuChipIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    ListBulletIcon,
    PhoneIcon,
    TruckIcon,
} from "@heroicons/vue/16/solid";
import { PHONE_NUMBER, PHONE_NUMBER_NORMALIZED, EMAIL, COMPANY_INN, COMPANY_KPP } from "~/data";
</script>
<template>
    <div class="bg-gray-50">
        <!-- Герой-секция с акцентом на ваши товары -->
        <section class="hero-gradient text-white">
            <div class="container mx-auto px-4 py-20 md:py-28">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-1/2 mb-12 md:mb-0">
                        <div class="bg-white bg-opacity-20 rounded-full px-5 py-1.5 inline-block mb-6">
                            <span class="font-medium text-sm tracking-wide text-accent">БЕСПЛАТНАЯ ДОСТАВКА ДО ТК</span>
                        </div>
                        <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">КОМПЛЕКТУЮЩИЕ ДЛЯ ПРОМЫШЛЕННОЙ ЭЛЕКТРОТЕХНИКИ</h1>
                        <p class="text-xl mb-8 opacity-90 max-w-lg">Автоматические выключатели, блоки питания, клеммы, контроллеры и другие электротехнические компоненты для предприятий</p>

                        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <a
                                href="#contact-form"
                                class="bg-white text-[#0081b6] font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                                <PhoneIcon class="size-6 me-3" />
                                ЗАКАЗАТЬ ЗВОНОК
                            </a>
                            <RouterLink
                                to="catalog"
                                class="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-[#0081b6] transition duration-300 flex items-center justify-center hover:shadow-lg">
                                <ListBulletIcon class="size-6 mr-3" />
                                СМОТРЕТЬ КАТАЛОГ
                            </RouterLink>
                        </div>

                        <div class="mt-10 flex flex-wrap gap-3">
                            <div class="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm gap-2">
                                <CheckCircleIcon class="size-6 text-[#0081b6]" />
                                <span class="text-sm text-[#0081b6]">Собственный склад</span>
                            </div>
                            <div class="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm gap-2">
                                <CheckCircleIcon class="size-6 text-[#0081b6]" />
                                <span class="text-sm text-[#0081b6]">Оригинальные компоненты</span>
                            </div>
                            <div class="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm gap-2">
                                <CheckCircleIcon class="size-6 text-[#0081b6]" />
                                <span class="text-sm text-[#0081b6]">Техническая консультация</span>
                            </div>
                        </div>
                    </div>

                    <div class="md:w-1/2 relative">
                        <div class="bg-white bg-opacity-20 rounded-2xl p-3 shadow-2xl backdrop-blur-sm">
                            <div class="bg-gray-100 border-2 border-gray-200 rounded-xl w-full h-80 flex items-center justify-center">
                                <img src="assets/Logo_Index.PNG" alt="Электротехника" class="rounded-lg object-cover h-full w-full" />
                            </div>
                        </div>
                        <div class="absolute m-x-4 md:-bottom-6 md:-right-6 bg-white text-gray-900 p-4 md:p-6 rounded-xl shadow-hard w-max md:min-w-48 floating-phone border border-gray-100">
                            <div class="flex items-center mb-2">
                                <div class="bg-[#0081b6] rounded-full p-2 mr-3 pulse-animation">
                                    <PhoneIcon class="size-6 text-white" />
                                </div>
                                <span class="font-bold text-sm">Отдел продаж</span>
                            </div>
                            <a :href="'tel:' + PHONE_NUMBER_NORMALIZED" class="text-lg font-bold hover:text-[#0081b6]">{{ PHONE_NUMBER }}</a>
                            <div class="text-xs text-gray-500 mt-1">Пн-Пт: 9:00-18:00</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Преимущества с вашими условиями -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">НАШИ ПРЕИМУЩЕСТВА</h2>
                <p class="text-center text-gray-600 max-w-2xl mx-auto mb-12">Работаем с юридическими лицами по безналичному расчету</p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="feature-card bg-gray-50 rounded-xl p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                        <div class="bg-[#0081b6] bg-opacity-10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                            <TruckIcon class="size-9 text-white" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900">Доставка до ТК</h3>
                        <p class="text-gray-600">Бесплатная доставка до транспортной компании. Бесплатная доставка по Москве в пределах МКАД при заказе от 50 000 ₽</p>
                    </div>

                    <div class="feature-card bg-gray-50 rounded-xl p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                        <div class="bg-[#0081b6] bg-opacity-10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                            <ArchiveBoxIcon class="size-9 text-white" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900">Широкий ассортимент</h3>
                        <p class="text-gray-600">Автоматы, блоки питания, клеммы, контроллеры и другие электротехнические компоненты</p>
                    </div>

                    <div class="feature-card bg-gray-50 rounded-xl p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                        <div class="bg-[#0081b6] bg-opacity-10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                            <CurrencyDollarIcon class="size-9 text-white" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900">Гибкие условия</h3>
                        <p class="text-gray-600">Работаем по безналичному расчету с НДС. Индивидуальные условия для постоянных клиентов</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Популярные категории с вашими товарами -->
        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">КАТЕГОРИИ ТОВАРОВ</h2>
                        <p class="text-gray-600">Широкий ассортимент электротехнических компонентов</p>
                    </div>
                    <a href="catalog" class="mt-4 md:mt-0 flex items-center text-[#0081b6] font-medium hover:text-blue-800 group">
                        <span class="border-b border-transparent group-hover:border-blue-600 transition-colors">Весь каталог</span>
                        <ArrowRightIcon class="ml-2 size-6 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <a
                        href="catalog"
                        class="group bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:border-blue-600 hover:border hover:-translate-y-1 border border-transparent">
                        <div class="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-colors">В</div>
                        <h3 class="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#0081b6] transition-colors">Автоматические выключатели</h3>
                        <p class="text-gray-600 text-sm">Защита электроцепей от перегрузок и КЗ</p>
                        <div class="mt-4 text-[#0081b6] font-medium flex items-center text-sm group-hover:text-blue-800 transition-colors">
                            Смотреть товары
                            <ChevronRightIcon class="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </a>

                    <a
                        href="catalog"
                        class="group bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:border-blue-600 hover:border hover:-translate-y-1 border border-transparent">
                        <div class="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white text-[#0081b6] transition-colors">БП</div>
                        <h3 class="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#0081b6] transition-colors">Блоки питания</h3>
                        <p class="text-gray-600 text-sm">Стабилизированные источники питания</p>
                        <div class="mt-4 text-[#0081b6] font-medium flex items-center text-sm group-hover:text-blue-800 transition-colors">
                            Смотреть товары
                            <ChevronRightIcon class="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </a>

                    <a
                        href="catalog"
                        class="group bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:border-blue-600 hover:border hover:-translate-y-1 border border-transparent">
                        <div class="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white text-[#0081b6] transition-colors">К</div>
                        <h3 class="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#0081b6] transition-colors">Клеммы и соединители</h3>
                        <p class="text-gray-600 text-sm">Надежные решения для монтажа</p>
                        <div class="mt-4 text-[#0081b6] font-medium flex items-center text-sm group-hover:text-blue-800 transition-colors">
                            Смотреть товары
                            <ChevronRightIcon class="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </a>

                    <a
                        href="catalog"
                        class="group bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:border-blue-600 hover:border hover:-translate-y-1 border border-transparent">
                        <div class="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white text-[#0081b6] transition-colors">
                            <CpuChipIcon class="size-7" />
                        </div>
                        <h3 class="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#0081b6] transition-colors">Промышленные контроллеры</h3>
                        <p class="text-gray-600 text-sm">Широкий выбор моделей для автоматизации</p>
                        <div class="mt-4 text-[#0081b6] font-medium flex items-center text-sm group-hover:text-blue-800 transition-colors">
                            Смотреть товары
                            <ChevronRightIcon class="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Баннер с призывом -->
        <section class="py-16 bg-gradient-to-r from-[#006699] to-[#0081b6] text-white">
            <div class="container mx-auto px-4 text-center">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold mb-6">НУЖНА КОНСУЛЬТАЦИЯ ПО ПОДБОРУ КОМПЛЕКТУЮЩИХ?</h2>
                    <p class="text-xl mb-8 opacity-90">Наши специалисты помогут подобрать оптимальные решения для вашего предприятия</p>

                    <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a
                            :href="'tel:' + PHONE_NUMBER_NORMALIZED"
                            class="bg-white text-accent font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                            <PhoneIcon class="size-6 mr-3" />
                            Позвонить сейчас
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Форма обратной связи -->
        <section id="contact-form" class="py-16 bg-white">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div class="md:flex">
                        <div class="md:w-1/2 bg-accent text-white p-4 md:p-10">
                            <h2 class="text-2xl font-bold mb-4">КОНТАКТЫ</h2>
                            <p class="mb-6 opacity-90">Оставьте заявку для получения коммерческого предложения</p>

                            <div class="space-y-5">
                                <div class="flex items-start">
                                    <div class="bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                        <PhoneIcon class="size-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-sm text-blue-200">Телефон отдела продаж</h3>
                                        <a :href="'tel:' + PHONE_NUMBER_NORMALIZED" class="text-lg font-medium hover:underline">{{ PHONE_NUMBER }}</a>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                        <EnvelopeIcon class="text-accent size-6" />
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-sm text-blue-200">Email для заявок</h3>
                                        <a :href="'mailto:' + EMAIL" class="text-lg font-medium hover:underline">{{ EMAIL }}</a>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                        <DocumentTextIcon class="text-accent size-6" />
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-sm text-blue-200">Реквизиты</h3>
                                        <p class="text-sm font-medium">ИНН {{ COMPANY_INN }}, КПП {{ COMPANY_KPP }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="md:w-1/2 p-4 md:p-10">
                            <form>
                                <div class="mb-5">
                                    <label for="company" class="block text-gray-700 mb-2 font-medium">Название компании*</label>
                                    <input
                                        type="text"
                                        id="company"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition"
                                        required />
                                </div>
                                <div class="mb-5">
                                    <label for="name" class="block text-gray-700 mb-2 font-medium">Контактное лицо*</label>
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
                                <div class="mb-6">
                                    <label for="message" class="block text-gray-700 mb-2 font-medium">Интересующие товары</label>
                                    <textarea
                                        id="message"
                                        rows="3"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition"
                                        placeholder="Например: контроллеры ABB, клеммы WAGO..."></textarea>
                                </div>
                                <button type="submit" class="w-full bg-accent text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
                                    Получить коммерческое предложение
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

.hero-gradient {
    background: linear-gradient(135deg, #006699 0%, #0081b6 100%);
}

.floating-phone {
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-15px);
    }

    100% {
        transform: translateY(0px);
    }
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
