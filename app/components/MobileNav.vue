<script setup>
import {
  HomeIcon,
  UserCircleIcon,
  QueueListIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/outline";
const links = [
  {
    to: "/",
    text: "Главная",
    icon: HomeIcon,
  },
  {
    to: "/catalog",
    text: "Каталог",
    icon: QueueListIcon,
  },
  {
    to: "/cart",
    text: "Корзина",
    icon: ShoppingCartIcon,
    isCart: true,
  },
  {
    to: "/account/",
    text: "Профиль",
    icon: UserCircleIcon,
  },
];
const cart = useCartStore();
</script>
<template>
  <nav
    class="sticky bottom-0 z-50 bg-white px-3 py-1 shadow-md shadow-black lg:hidden"
  >
    <div class="flex justify-around">
      <NuxtLink v-slot="{ isExactActive }" :to="link.to" v-for="link in links">
        <div
          :class="[
            'flex flex-col items-center gap-1 rounded-xl p-1 px-2 transition-all duration-200',
            isExactActive
              ? 'text-accent'
              : 'hover:bg-gray-200 active:bg-gray-300',
          ]"
        >
          <template v-if="link.isCart">
            <div class="relative">
              <Transition
                enter-to-class="scale-250 -y-offset-5"
                leave-to-class="scale-0"
              >
                <span
                  v-if="cart.totalItems != 0"
                  class="bg-accent absolute -top-2 -right-7 flex h-6 w-6 items-center justify-center rounded-full font-mono text-sm font-semibold text-white transition-all duration-200"
                >
                  {{ cart.totalItems }}
                </span>
              </Transition>
            </div>
          </template>
          <component :is="link.icon" class="size-6" />
          <div :class="['text-sm']">{{ link.text }}</div>
        </div>
      </NuxtLink>
    </div>
  </nav>
</template>
