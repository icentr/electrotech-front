<script setup lang="ts">
import { DOCS } from "@/data";
import { ArrowUpRightIcon } from "@heroicons/vue/16/solid";
import { usePageTitle } from "~/utils";
usePageTitle("Документы");
</script>
<template>
  <BreadcrumbsBlock page="Документы" />

  <RouterLink class="btn" :to="DOCS.privacyPolicy.link">
    Политика конфиденциальности
    <ArrowUpRightIcon class="size-5" />
  </RouterLink>
  <RouterLink
    class="btn"
    :to="DOCS.userAgreement.link"
    v-if="DOCS.userAgreement.enabled"
  >
    Пользовательское соглашение
    <ArrowUpRightIcon class="size-5" />
  </RouterLink>
</template>
