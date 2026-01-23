<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/16/solid";
const props = defineProps<{
  label?: string;
}>();
</script>
<template>
  <div class="py-12 text-center text-gray-500">
    {{ label ?? "Загрузка" }}
    <div class="flex items-center justify-center">
      <ArrowPathIcon class="mr-2 size-10 animate-spin" />
    </div>
  </div>
</template>
