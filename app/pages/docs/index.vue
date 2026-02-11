<script setup lang="ts">
import { DOCS } from "@/data";
import { ArrowUpRightIcon } from "@heroicons/vue/16/solid";
import { usePageTitle } from "~/utils";
usePageTitle("Документы");
</script>
<template>
  <BreadcrumbsBlock page="Документы" />

  <div class="flex flex-col gap-3">
    <div v-for="doc in DOCS">
      <div v-if="doc.type == 'page'">
        <RouterLink class="btn" v-if="!doc.disabled" :to="doc.link">
          {{ doc.prettyName }}
        </RouterLink>
      </div>
      <div v-if="doc.type == 'file'">
        <a :href="doc.link" class="btn" target="_blank">
          {{ doc.prettyName }}
          <ArrowUpRightIcon class="size-4" />
        </a>
      </div>
    </div>
  </div>
</template>
