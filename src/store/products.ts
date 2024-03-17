import { defineStore } from "pinia";
import Product from "../components/products/Product.vue";

const apiProducts = "https://api.escuelajs.co/api/v1/products";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}
interface ProductState {
  items: Record<string, Product>;
  ids: number[];
}

export const useProductStore = defineStore({
  id: "products",

  state: (): ProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {
      return this.ids.map((i) => this.items[i]);
    },
    loaded(): boolean {
      return this.ids.length > 0;
    },
  },

  actions: {
    async fetch() {
      if (this.loaded) return;
      const res = await fetch(apiProducts);
      const data: Product[] = await res.json();
      this.ids = data.map((product) => {
        this.items[product.id] = product;
        return product.id;
      });
    },
  },
});
