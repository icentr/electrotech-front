import {formatCurrency } from "@/utils"
export type Currency = "RUB" | "USD" | "EUR" | "GBP" | "ILS";
// export type CurrencySymbol = "₽" | "$" | "€" | "£" | "₪";
export interface Product{
  id: string;
  name: string;
  description: string;
  price: number;
  currency: Currency;
  count: number;
  imagePath: string;
  articleNumber: string;
};


export function formatPrice(this: Product) {
  return formatCurrency(this.price, this.currency);
}
