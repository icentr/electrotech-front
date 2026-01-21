<script setup lang="ts">
import {
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  PhoneIcon,
  ClockIcon,
} from "@heroicons/vue/16/solid";
const router = useRouter();
const auth = useAuthStore();
const cart = useCartStore();

const handleLogout = () => {
  auth.clear();
  cart.clearCart();
  router.push("/login");
};

const navLinks = [
  { text: "Главная", to: "/" },
  { text: "Каталог", to: "/catalog" },
  { text: "О компании", to: "/company" },
];

import { COMPANY_PHONE, COMPANY_PHONE_NORMALIZED } from "~/data";
</script>
<template>
  <header class="sticky top-0 z-50 bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <!-- Логотип -->
        <div class="flex items-center">
          <div>
            <NuxtLink to="/">
              <img src="/logo.svg" class="max-h-12 md:hidden" />
              <img
                src="assets/Logo_Header.png"
                alt="Электротехника"
                class="hidden max-h-16 md:block"
              />
            </NuxtLink>
          </div>
        </div>
        <!-- Навигация -->
        <nav class="hidden lg:block">
          <ul class="flex space-x-8">
            <li v-for="link in navLinks">
              <NuxtLink
                :to="link.to"
                class="hover:text-accent hover:border-accent border-b-2 border-transparent px-3 py-2 text-[#4b5563] transition-all duration-200"
              >
                {{ link.text }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/cart"
                class="hover:text-accent hover:border-accent relative border-b-2 border-transparent px-3 py-2 text-[#4b5563] transition-all duration-200"
              >
                Корзина
                <Transition
                  enter-to-class="scale-250 -y-offset-5"
                  leave-to-class="scale-0"
                >
                  <span
                    v-if="cart.totalItems != 0"
                    class="bg-accent absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full font-mono text-sm font-semibold text-white transition-all duration-200"
                  >
                    {{ cart.totalItems }}
                  </span>
                </Transition>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <!-- Контакты -->
        <div class="ml-4 hidden items-center xl:flex">
          <PhoneIcon class="mr-2 size-5" />
          <a
            :href="'tel:' + COMPANY_PHONE_NORMALIZED"
            class="hover:text-accent font-medium"
          >
            {{ COMPANY_PHONE }}
          </a>
        </div>
        <div class="ml-4 hidden space-x-6 2xl:flex">
          <ClockIcon class="mr-2 size-5" />
          <span>Пн-Пт: 9:00–18:00</span>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            v-if="auth.status == 'authenticated'"
            to="/account"
            class="btn btn-accent-outline"
            title="Личный кабинет"
          >
            <div class="flex items-center justify-center gap-2">
              <UserIcon class="size-5" />
              <span class="w-max">Личный кабинет</span>
            </div>
          </NuxtLink>
          <button
            v-if="auth.status == 'authenticated'"
            title="Выход из аккаунта"
            class="btn btn-destructive"
            @click="handleLogout"
          >
            <ArrowLeftStartOnRectangleIcon class="size-6" />
            <span class="hidden sm:inline"> Выход </span>
          </button>
          <NuxtLink v-else to="/login" class="btn btn-accent-outline">
            <div class="flex items-center gap-2">
              <ArrowRightEndOnRectangleIcon class="size-5" />
              <span class="text-md">Вход</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
