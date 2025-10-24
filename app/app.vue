<script setup>
import { ArrowLeftEndOnRectangleIcon, UserIcon, ShoppingCartIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/vue/16/solid";


useMeta({
    meta: [
        {
            name: 'mailru-domain',
            content: 'wxnnsnigYdZwQSET'
        }
    ]
})

const router = useRouter();
const auth = useAuthStore();
const cart = useCartStore();

const handleLogout = () => {
    auth.logout();
    cart.clearCart();
    router.push("/login");
};
</script>

<template>
    <div class="bg-gray-50 min-h-svh flex flex-col">

        <!-- Хедер -->
        <Header class="bg-white shadow-md sticky top-0 z-50"></Header>


        <!-- Контент -->
        <main class="container mx-auto md:px-4 py-2 md:py-6 grow">
            <NuxtPage />
        </main>

        <!-- Футер -->
        <TheFooter />
        <MobileNav />
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