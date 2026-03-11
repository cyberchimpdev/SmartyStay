export const formatNPR = (usd) => {
  const rate = 133;
  const npr = Number(usd || 0) * rate;

  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(npr);
};

export const formatUSD = (usd) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(usd || 0));
};
