<script setup>
import { HomeIcon, UserCircleIcon, QueueListIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
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
    <nav class="z-50 md:hidden sticky bottom-0 bg-white py-1 px-3 shadow-black shadow-md">
        <div class="flex justify-around">
            <NuxtLink v-slot="{ isExactActive }" :to="link.to" v-for="link in links">
                <div :class="['flex flex-col gap-1 items-center p-1 px-2 rounded-xl transition-all duration-200', isExactActive ? 'text-blue-500' : 'hover:bg-gray-200 active:bg-gray-300']">
                    <template v-if="link.isCart">
                        <div class="relative">
                            <Transition enter-to-class="scale-250 -y-offset-5" leave-to-class="scale-0">
                                <span
                                    v-if="cart.totalItems != 0"
                                    class="font-mono duration-200 absolute -top-2 -right-7 transition-all bg-[#2563eb] text-white text-sm font-semibold rounded-full w-6 h-6 flex justify-center items-center">
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
