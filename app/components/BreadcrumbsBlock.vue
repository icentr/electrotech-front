<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/16/solid";
type Breadcrumb = {
  name: string | null;
  url: string | null;
};
const props = defineProps<{
  page: String;
  breadcrumbs: Breadcrumb[] | null;
}>();
</script>
<template>
  <div class="container mx-auto px-4 py-6">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2">
        <li class="inline-flex items-center">
          <NuxtLink
            to="/"
            class="hover:text-accent active:text-accent inline-flex items-center font-medium text-gray-700 md:text-sm"
          >
            <ChevronRightIcon class="size-7 md:size-5" />
            Главная
          </NuxtLink>
        </li>
        <li v-for="page in props.breadcrumbs" class="inline-flex items-center">
          <NuxtLink
            v-if="page.url"
            :to="page.url"
            class="hover:text-accent active:text-accent inline-flex items-center font-medium text-gray-700 md:text-sm"
          >
            <ChevronRightIcon class="size-7 md:size-5" />
            {{ page.name }}
          </NuxtLink>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <ChevronRightIcon class="size-7 md:size-5" />
            <span class="font-medium text-gray-500 md:text-sm">{{
              props.page
            }}</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
