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
                            <RouterLink to="/" class="text-xl font-bold text-gray-900 hover:text-blue-600"> ЭЛЕКТРО<span class="text-blue-600">ТЕХ</span> </RouterLink>
                            <p class="text-xs text-gray-500">Поставки электротехнического оборудования</p>
                        </div>
                    </div>

                    <!-- Навигация -->
                    <nav class="hidden lg:block">
                        <ul class="flex space-x-8">
                            <li><RouterLink to="/" class="nav-link">Главная</RouterLink></li>
                            <li><RouterLink to="/catalog" class="nav-link">Каталог</RouterLink></li>
                            <li><RouterLink to="/company" class="nav-link">О компании</RouterLink></li>
                        </ul>
                    </nav>

                    <!-- Панель справа -->
                    <div class="flex items-center space-x-6">
                        <div class="hidden md:flex items-center space-x-5">
                            <template v-if="auth.isAuthenticated">
                                <button class="auth-button" @click="handleLogout">
                                    <i class="fas fa-sign-out-alt mr-2"></i>
                                    <span class="font-medium">Выход</span>
                                </button>
                            </template>
                            <template v-else>
                                <RouterLink to="/login" class="auth-button">
                                    <i class="far fa-user mr-2"></i>
                                    <span class="font-medium">Вход</span>
                                </RouterLink>
                            </template>

                            <RouterLink to="/account" class="icon-button">
                                <i class="fas fa-user-circle"></i>
                                <span class="ml-2">Аккаунт</span>
                            </RouterLink>
                        </div>

                        <RouterLink to="/cart" class="icon-button relative">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-badge">3</span>
                            <span class="ml-2">Корзина</span>
                        </RouterLink>

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

<script setup>
const router = useRouter();
const auth = useAuthStore();

const handleLogout = () => {
    auth.logout();
    router.push("/login");
};
</script>

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
.cart-badge {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background-color: #2563eb;
    color: white;
    border-radius: 9999px;
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
}
</style>
