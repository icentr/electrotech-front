<script setup>
import { UserIcon, ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, PhoneIcon, ClockIcon } from "@heroicons/vue/16/solid";
const router = useRouter();
const auth = useAuthStore();
const cart = useCartStore();

const handleLogout = () => {
  auth.logout();
  cart.clearCart();
  router.push("/login");
};


const navLinks = [
  { text: "Главная", to: "/" },
  { text: "Каталог", to: "/catalog" },
  { text: "О компании", to: "/company" },
]

import { PHONE_NUMBER, PHONE_NUMBER_NORMALIZED } from "~/data";
</script>
<template>
  <header class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between py-4">
        <!-- Логотип -->
        <div class="flex items-center">
          <div>
            <NuxtLink to="/" > <img src="assets/Logo_Header.png"
                alt="Электротехника" class="max-w-50"></img> </NuxtLink>
          </div>
        </div>
        <!-- Навигация -->
        <nav class="hidden lg:block">
          <ul class="flex space-x-8">
            <li v-for="link in navLinks">
              <NuxtLink :to="link.to"
                class="text-[#4b5563] px-3 py-2 border-b-2 border-transparent transition-all duration-200 hover:text-accent hover:border-accent">
                {{ link.text }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart"
                class="text-[#4b5563] px-3 py-2 border-b-2 border-transparent transition-all duration-200 hover:text-accent hover:border-accent relative">
                Корзина
                <Transition enter-to-class="scale-250 -y-offset-5" leave-to-class="scale-0">
                  <span v-if="cart.totalItems != 0"
                    class="font-mono duration-200 absolute -top-2 -right-2 transition-all bg-accent text-white text-sm font-semibold rounded-full w-6 h-6 flex justify-center items-center">
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
          <a :href="'tel:' + PHONE_NUMBER_NORMALIZED" class="font-medium hover:text-accent">
            {{ PHONE_NUMBER }}
          </a>
        </div>
        <div class="hidden md:flex space-x-6 ml-4">
          <ClockIcon class="size-5 mr-2" />
          <span>Пн-Пт: 9:00–18:00</span>
        </div>
        <div class="hidden md:flex gap-3">
          <NuxtLink v-if="auth.isAuthenticated" to="/account" class="btn text-accent" title="Личный кабинет">
            <div class="text-accent/80 flex justify-center items-center gap-2">
              <UserIcon class="size-5" />
              <span class="w-max">Личный кабинет</span>
            </div>
          </NuxtLink>
          <button v-if="auth.isAuthenticated" title="Выход из аккаунта"
          class="btn btn-destructive"
            @click="handleLogout">
            <ArrowLeftStartOnRectangleIcon class="size-6" />
            <span>
Выход
            </span>
          </button>
          <NuxtLink v-else to="/login" class="auth-button">
            <span class="text-md">Вход</span>
            <ArrowRightEndOnRectangleIcon class="size-5 ms-2" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
<style >
@import "tailwindcss";
.router-link-active {
  font-weight: 500;
  border-color: #0081b6;
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
  @apply py-2 px-3 shadow;
  display: flex;
  align-items: center;
  color: #4b5563;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  transition: color 0.2s, background-color 0.2s;
}

.icon-button:hover {
  color: #0081b6;
  background-color: #e5e7eb;
}
</style>
