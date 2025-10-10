<script setup>
import { ArrowLeftEndOnRectangleIcon, UserIcon, ShoppingCartIcon, ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/vue/16/solid";
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
    <header class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between py-4">
                <!-- Логотип -->
                <div class="flex items-center">
                    <div class="bg-blue-600 p-2 rounded-lg mr-3 shadow-sm">
                        <i class="fas fa-bolt text-white text-xl"></i>
                    </div>
                    <div>
                        <NuxtLink to="/" class="text-xl font-bold text-gray-900 hover:text-blue-600"> ЭЛЕКТРО<span class="text-blue-600">ТЕХ</span> </NuxtLink>
                        <p class="text-xs text-gray-500">Поставки электротехнического оборудования</p>
                    </div>
                </div>

                <!-- Навигация -->
                <nav class="hidden lg:block">
                    <ul class="flex space-x-8">
                        <li><NuxtLink to="/" class="nav-link">Главная</NuxtLink></li>
                        <li><NuxtLink to="/catalog" class="nav-link">Каталог</NuxtLink></li>
                        <li><NuxtLink to="/company" class="nav-link">О компании</NuxtLink></li>
                        <li>
                            <NuxtLink to="/cart" class="nav-link relative">
                                Корзина
                                <Transition enter-to-class="scale-250 -y-offset-5" leave-to-class="scale-0">
                                    <span
                                        v-if="cart.totalItems != 0"
                                        class="font-mono duration-200 absolute -top-2 -right-2 transition-all bg-[#2563eb] text-white text-sm font-semibold rounded-full w-6 h-6 flex justify-center items-center">
                                        {{ cart.totalItems }}
                                    </span>
                                </Transition>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>

                <!-- Панель справа -->
                <div class="flex items-center space-x-6">
                    <div class="hidden md:flex items-center space-x-5"></div>

                    <button class="lg:hidden text-gray-600 hover:text-blue-600">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>

                <!-- Контакты -->
                <div class="flex items-center ml-4">
                    <i class="fas fa-phone-alt mr-2 text-blue-400"></i>
                    <a :href="'tel:' + PHONE_NUMBER_NORMALIZED" class="font-medium hover:text-blue-400">
                        {{ PHONE_NUMBER }}
                    </a>
                </div>
                <div class="hidden md:flex space-x-6 ml-4">
                    <i class="far fa-clock mr-2 text-blue-400"></i>
                    <span>Пн-Пт: 9:00–18:00</span>
                </div>
                <div class="flex gap-3">
                    <NuxtLink v-if="auth.isAuthenticated" to="/account" class="icon-button">
                        <UserIcon class="size-5 me-1" />
                        <span class="ml-2">Аккаунт</span>
                    </NuxtLink>
                    <NuxtLink
                        v-if="auth.isAuthenticated"
                        title="Выход из аккаунта"
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
    color: #2563eb;
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
    color: #2563eb;
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
    color: #2563eb;
    background-color: #e5e7eb;
}
</style>
