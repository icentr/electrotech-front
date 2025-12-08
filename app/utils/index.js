export const DEFAULT_CURRENCY = "RUB";
const formatCurrency = (amount, currency = null) => {
  if (!currency) {
    currency = DEFAULT_CURRENCY;
  }
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  }).format(amount);
};

export { formatCurrency };
