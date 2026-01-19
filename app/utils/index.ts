export const DEFAULT_CURRENCY = "RUB";

const formatCurrency = (amount: number, currency: string | null = null) => {
  if (!currency) {
    currency = DEFAULT_CURRENCY;
  }
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: String(currency),
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getApiBaseUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiBase;
};
export const getImageUrl = (filename: string) => {
  if (!filename) {
    console.warn("No filename provided");
    return "";
  }
  return `${getApiBaseUrl()}files/${filename}`;
};

export { formatCurrency };

import { SHORT_NAME } from "~/data";
import type { ComputedRef } from "vue";

export const usePageTitle = (title: string | ComputedRef<string>) => {
  useHead({
    title: computed(() => title + " | " + SHORT_NAME),
  });
};
