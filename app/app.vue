<script setup>
import { ArrowLeftEndOnRectangleIcon, UserIcon, ShoppingCartIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/vue/16/solid";
const router = useRouter();
const auth = useAuthStore();
const cart = useCartStore();

const handleLogout = () => {
    auth.logout();
    router.push("/login");
};
</script>

<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Хедер -->
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
                            <li>
                                <NuxtLink to="/" class="nav-link"> Главная</NuxtLink>
                            </li>
                            <li><NuxtLink to="/catalog" class="nav-link">Каталог</NuxtLink></li>
                            <li><NuxtLink to="/company" class="nav-link">О компании</NuxtLink></li>
                        </ul>
                    </nav>

                    <!-- Панель справа -->
                    <div class="flex items-center space-x-6">
                        <div class="hidden md:flex items-center space-x-5">
                            <template v-if="auth.isAuthenticated">
                                <button class="auth-button" @click="handleLogout">
                                    <i class="fas fa-sign-out-alt mr-2"></i>
                                    <ArrowLeftStartOnRectangleIcon class="size-6 me-2" />
                                    <span class="font-medium">Выход</span>
                                </button>
                            </template>
                            <template v-else>
                                <NuxtLink to="/login" class="auth-button">
                                    <ArrowLeftEndOnRectangleIcon class="size-6 me-2" />
                                    <span class="font-medium">Вход</span>
                                </NuxtLink>
                            </template>

                            <NuxtLink v-if="auth.isAuthenticated" to="/account" class="icon-button">
                                <UserIcon class="size-5 me-1" />
                                <span class="ml-2">Аккаунт</span>
                            </NuxtLink>
                        </div>

                        <NuxtLink to="/cart" class="icon-button relative">
                            <ShoppingCartIcon class="size-5 me-1" />
                            Корзина

                            <Transition enter-to-class="scale-250 -y-offset-5" leave-to-class="scale-0">
                                <span
                                    v-if="cart.totalItems != 0"
                                    class="duration-200 absolute -top-2 -right-2 transition-all bg-[#2563eb] text-white text-sm font-semibold rounded-full w-6 h-6 flex justify-center items-center"
                                    >{{ cart.totalItems }}</span
                                >
                            </Transition>
                        </NuxtLink>

                        <button class="lg:hidden text-gray-600 hover:text-blue-600">
                            <i class="fas fa-bars text-xl"></i>
                        </button>
                    </div>

                    <!-- Контакты -->
                    <div class="flex items-center ml-4">
                        <i class="fas fa-phone-alt mr-2 text-blue-400"></i>
                        <a href="tel:+74951234567" class="font-medium hover:text-blue-400">+7 (495) 123-45-67</a>
                    </div>
                    <div class="hidden md:flex space-x-6 ml-4">
                        <i class="far fa-clock mr-2 text-blue-400"></i>
                        <span>Пн-Пт: 9:00–18:00</span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Контент -->
        <main class="container mx-auto px-4 py-6">
            <NuxtPage />
        </main>

        <!-- Футер -->
        <footer class="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div class="container mx-auto px-4">
                <p class="text-center text-gray-500 text-sm mt-8">© 2025 ЭЛЕКТРОТЕХ. Все права защищены.</p>
            </div>
        </footer>
    </div>
</template>

<style>
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
    background-color: #f3f4f6;
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
