<!-- src/App.vue -->
<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Общий хедер для всего приложения -->
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center">
            <div class="bg-blue-600 p-2 rounded-lg mr-3 shadow-sm">
              <i class="fas fa-bolt text-white text-xl"></i>
            </div>
            <div>
              <RouterLink to="/" class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                ЭЛЕКТРО<span class="text-blue-600">ТЕХ</span>
              </RouterLink>
              <p class="text-xs text-gray-500">Поставки электротехнического оборудования</p>
            </div>
          </div>
          
          <nav class="hidden lg:block">
            <ul class="flex space-x-8">
              <li><RouterLink to="/" class="nav-link">Главная</RouterLink></li>
              <li><RouterLink to="/catalog" class="nav-link">Каталог</RouterLink></li>
              <li><RouterLink to="/company" class="nav-link">О компании</RouterLink></li>
            </ul>
          </nav>
          
          
          
          <div class="flex items-center space-x-6">
            <div class="hidden md:flex items-center space-x-5">
              <button class="auth-button">
                <i class="far fa-user mr-2"></i>
                <a href="/login" class="font-medium">Вход</a>
              </button>
              <button class="icon-button"> <!-- это кнопка или иконка аккаунта пользователя -->
                <i class="fas fa-search"></i>
                <a href="/account">Аккаунт</a>
              </button>
            </div>
            <div class="relative">
              <button class="icon-button relative">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-badge">3</span>
                <a href="/cart">Корзина</a>
              </button>
            </div>
            <button class="lg:hidden text-gray-600 hover:text-blue-600">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
          <div class="flex ">
              <i class="fas fa-phone-alt mr-2 text-blue-400 space-x-6"></i>
              <a href="tel:+74951234567" class="font-medium hover:text-blue-400 transition-colors">+7 (495) 123-45-67</a>
          </div>
          <div class="hidden md:flex space-x-6">
            <i class="far fa-clock mr-2 text-blue-400"></i>
            <span>Пн-Пт: 9:00-18:00</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Основное содержимое страниц -->
    <main class="container mx-auto px-4 py-6">
      <RouterView />
    </main>

        <footer class="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <div class="flex items-center mb-6">
                        <div class="bg-blue-600 p-2 rounded-lg mr-3 shadow-sm">
                            <i class="fas fa-bolt text-white"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white">ЭЛЕКТРО<span class="text-blue-400">ТЕХ</span></h3>
                    </div>
                    <p class="mb-6 text-gray-400">Поставки электротехнических компонентов для промышленных предприятий</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors bg-gray-800 hover:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
                            <i class="fab fa-vk"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors bg-gray-800 hover:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
                            <i class="fab fa-telegram"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors bg-gray-800 hover:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
                
                <div>
                    <h4 class="text-white text-lg font-semibold mb-5 uppercase tracking-wider text-sm">Каталог</h4>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Контроллеры</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Автоматические выключатели</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Блоки питания</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Клеммы и соединители</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Другое оборудование</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-white text-lg font-semibold mb-5 uppercase tracking-wider text-sm">Компания</h4>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">О нас</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Условия работы</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Доставка и оплата</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Контакты</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-white text-lg font-semibold mb-5 uppercase tracking-wider text-sm">Для юридических лиц</h4>
                    <ul class="space-y-4">
                        <li class="flex items-start">
                            <i class="fas fa-phone-alt mt-1 mr-4 text-blue-400"></i>
                            <div>
                                <a href="tel:+74951234567" class="text-gray-100 hover:text-blue-400 transition-colors">+7 (495) 123-45-67</a>
                                <div class="text-xs text-gray-500 mt-1">Отдел продаж</div>
                            </div>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-envelope mt-1 mr-4 text-blue-400"></i>
                            <a href="mailto:sales@electro-tech.ru" class="text-gray-100 hover:text-blue-400 transition-colors">sales@electro-tech.ru</a>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-file-invoice mt-1 mr-4 text-blue-400"></i>
                            <span class="text-gray-100 text-sm">ИНН 1234567890, КПП 123456001</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-500 text-sm">© 2025 ЭЛЕКТРОТЕХ. Все права защищены.</p>
                <div class="mt-4 md:mt-0 flex space-x-6">
                    <a href="#" class="text-gray-500 hover:text-gray-300 text-sm transition-colors">Политика конфиденциальности</a>
                    <a href="#" class="text-gray-500 hover:text-gray-300 text-sm transition-colors">Пользовательское соглашение</a>
                </div>
            </div>
        </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
/* Убедитесь, что это глобальные стили (без scoped) */
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