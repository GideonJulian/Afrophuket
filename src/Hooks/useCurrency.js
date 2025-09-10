import { useSelector } from "react-redux";

export const useCurrency = () => {
  const currencyState = useSelector((s) => s.currency) || { selected: "USD", rates: { USD: 1 } };
  const selected = currencyState.selected ?? "USD";
  const rates = currencyState.rates ?? { USD: 1 };

  // Convert USD price -> selected currency
  const convert = (priceInUSD) => {
    const n = Number(priceInUSD) || 0;
    const rate = Number(rates[selected]) || 1;
    return n * rate;
  };

  const format = (amount, decimals = 2) => {
    const n = Number(amount) || 0;
    return n.toFixed(decimals);
  };

  const getSymbol = (currency) => {
    const symbols = { USD: "$", NGN: "₦", EUR: "€", GBP: "£" };
    return symbols[currency] || currency;
  };

  return { convert, format, symbol: getSymbol(selected), selected, rates };
};
