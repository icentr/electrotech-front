import { defineStore } from "pinia";
import type { Product } from "@/models";
import { getApi } from "@/api";
import { useAxios } from "@vueuse/integrations/useAxios";
import axios from "axios";

interface CatalogResponse {
  code: number;
  pages: number;
  page: number;
  total: number;
  products: Product[];
  error: string | null;
}

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    products: [] as Product[],
    error: null as string | null,
    searchString: "",
    currentPage: 0,
    totalPages: 0,
    totalProducts: 0,
  }),
  getters: {
    getProducts: (state) => state.products,
  },
  actions: {
    async setSearchString() {
      this.searchString = "";
      await this.fetch();
    },
    async setPage(page: number) {
      this.currentPage = page;
      await this.fetch();
    },

    async fetch() {
      console.log(
        "Получение товаров... Поисковая строка: %s",
        this.searchString,
      );

      const api = getApi();

      const { then } = useAxios<CatalogResponse>(
        "/v2/products",
        { params: { page: this.currentPage, search: this.searchString } },
        api,
      );

      then(({ data }) => {
        this.products = data.value.products;
        this.totalPages = data.value.pages;
        this.currentPage = data.value.page;
        this.totalProducts = data.value.total;
      });
    },
  },persist: true
});
