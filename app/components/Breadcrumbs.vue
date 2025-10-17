<script setup>
import { ChevronRightIcon } from "@heroicons/vue/16/solid";
const props = defineProps({
    breadcrumbs: { type: Array, required: false },
    page: { type: String, required: true },
});
</script>
<template>
    <div class="container mx-auto px-4 py-6">
        <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2">
                <li class="inline-flex items-center">
                    <NuxtLink to="/" class="inline-flex items-center md:text-sm font-medium text-gray-700 hover:text-blue-600 active:text-blue-600">
                        <ChevronRightIcon class="size-7 md:size-5" />
                        Главная
                    </NuxtLink>
                </li>
                <li v-for="page in props.breadcrumbs" class="inline-flex items-center">
                    <NuxtLink :to="page.url" class="inline-flex items-center md:text-sm font-medium text-gray-700 hover:text-blue-600 active:text-blue-600">
                        <ChevronRightIcon class="size-7 md:size-5" />
                        {{ page.name }}
                    </NuxtLink>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <ChevronRightIcon class="size-7 md:size-5" />
                        <span class="md:text-sm font-medium text-gray-500">{{ props.page }}</span>
                    </div>
                </li>
            </ol>
        </nav>
    </div>
</template>
