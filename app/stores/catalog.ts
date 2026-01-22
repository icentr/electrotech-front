import { defineStore } from "pinia";
import type { Product } from "@/models";
import { getApi } from "@/api";
import { useAxios } from "@vueuse/integrations/useAxios";

interface CatalogResponse {
  code: number;
  pages?: number;
  page?: number;
  total?: number;
  products?: Product[];
}

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    products: [] as Product[],
    error: null as string | null,
    searchString: "",
    currentPage: 0,
    totalPages: 0,
    totalProducts: 0,
    filters: {
      onlyAvailable: false,
    },
  }),
  getters: {
    getProducts: (state) => state.products,
  },
  actions: {
    setSearchString(newSearchString: string) {
      if (newSearchString === this.searchString) return;

      this.searchString = newSearchString;
      this.currentPage = 0;
    },
    setPage(page: number) {
      this.currentPage = page;
    },
    setOnlyAvailable(available: boolean) {
      this.filters.onlyAvailable = available;
    },

    async fetch() {
      this.error = null;
      console.debug(
        "Получение товаров... Поисковая строка: %s",
        this.searchString,
      );

      const api = getApi();

      const { then } = useAxios<CatalogResponse>(
        "/v2/products",
        {
          params: {
            page: this.currentPage,
            query: this.searchString,
            oa: this.filters.onlyAvailable,
          },
        },
        api,
      );

      then(({ data }) => {
        console.debug("Data received");
        if (data.value.code !== 200) {
          console.error(
            "Something bad happened, status code " + data.value.code.toString(),
          );
          this.error =
            "Something bad happened, status code " + data.value.code.toString();
        }
        this.products = data.value.products ?? [];
        this.totalPages = data.value.pages ?? 0;
        this.currentPage = data.value.page ?? 0;
        this.totalProducts = data.value.total ?? 0;
      });
    },
  },
  persist: true,
});
