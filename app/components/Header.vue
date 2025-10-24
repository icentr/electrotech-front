<script setup>
import {  UserIcon, ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, PhoneIcon, ClockIcon } from "@heroicons/vue/16/solid";
const router = useRouter();
const auth = useAuthStore();
const cart = useCartStore();

const handleLogout = () => {
    auth.logout();
    cart.clearCart();
    router.push("/login");
};

import { PHONE_NUMBER, PHONE_NUMBER_NORMALIZED } from "~/data";
</script>

<template>
    <header class="bg-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row items-center justify-between py-4">
                <!-- Логотип -->
                <div class="flex items-center">

                    <div>
                        <NuxtLink to="/" class="  text-xl font-bold text-gray-900 hover:text-blue-600 uppercase"> <img
                                src="assets/Logo_Header.png" alt="Электротехника" class="max-w-50"></img> </NuxtLink>
                    </div>
                </div>

                <!-- Навигация -->
                <nav class="hidden lg:block">
                    <ul class="flex space-x-8">
                        <li>
                            <NuxtLink to="/" class="nav-link">Главная</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/catalog" class="nav-link">Каталог</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/company" class="nav-link">О компании</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/cart" class="nav-link relative">
                                Корзина
                                <Transition enter-to-class="scale-250 -y-offset-5" leave-to-class="scale-0">
                                    <span v-if="cart.totalItems != 0"
                                        class="font-mono duration-200 absolute -top-2 -right-2 transition-all bg-[#2563eb] text-white text-sm font-semibold rounded-full w-6 h-6 flex justify-center items-center">
                                        {{ cart.totalItems }}
                                    </span>
                                </Transition>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>

                <!-- Контакты -->
                <div class="hidden md:flex items-center ml-4">
                    <PhoneIcon class="size-5 mr-2" />
                    <a :href="'tel:' + PHONE_NUMBER_NORMALIZED" class="font-medium hover:text-blue-400">
                        {{ PHONE_NUMBER }}
                    </a>
                </div>
                <div class="hidden md:flex space-x-6 ml-4">
                    <ClockIcon class="size-5 mr-2" />
                    <span>Пн-Пт: 9:00–18:00</span>
                </div>
                <div class="hidden md:flex gap-3">
                    <NuxtLink v-if="auth.isAuthenticated" to="/account" class="icon-button">
                        <UserIcon class="size-5 me-1" />
                        <span class="ml-2">Аккаунт</span>
                    </NuxtLink>
                    <NuxtLink v-if="auth.isAuthenticated" title="Выход из аккаунта"
                        class="flex items-center rounded-md px-2 py-1 cursor-pointer bg-red-200 text-red-500 hover:bg-red-200/80 active:bg-red-300 active:text-red-600 transition-all duration-200"
                        @click="handleLogout">
                        <ArrowLeftStartOnRectangleIcon class="size-6" />
                    </NuxtLink>
                    <NuxtLink v-else to="/login" class="auth-button">
                        <span class="text-md">Вход</span>
                        <ArrowRightEndOnRectangleIcon class="size-5 ms-2" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.nav-link {
    color: #4b5563;
    padding: 0.5rem 0.25rem;
    border-bottom-width: 2px;
    border-color: transparent;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #0081b6;
    border-color: #2563eb;
}

.nav-link.router-link-active {
    color: #111827;
    font-weight: 500;
    border-color: #2563eb;
}

.auth-button {
    display: flex;
    align-items: center;
    color: #4b5563;
    /* background-color: #f3f4f6; */
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    transition: color 0.2s, background-color 0.2s;
}

.auth-button:hover {
    color: #0081b6;
    background-color: #e5e7eb;
}

.icon-button {
    display: flex;
    align-items: center;
    color: #4b5563;
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    padding: 0.5rem;
    transition: color 0.2s, background-color 0.2s;
}

.icon-button:hover {
    color: #0081b6;
    background-color: #e5e7eb;
}
</style>
