// Display money in Pakistani Rupees format
export const dispalyMoney = function (num) {
  const amount = Number(num) || 0;

  return `Rs. ${Math.round(amount).toLocaleString("en-PK")}`;
};

// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, originalPrice) => {
  const disCountPercent = (discountedPrice / originalPrice) * 100;
  return disCountPercent;
};

// Calculate Total Amount
export const calculateTotal = (arr) => {
  const total = arr.reduce((accum, curr) => accum + curr, 0);
  return total;
};

export function generateDiscountedPrice(price) {
  const originalPrice = Number(price) || 0;
  const discountPercentage = 35;
  const discountAmount = (discountPercentage / 100) * originalPrice;
  const discountedPrice = originalPrice - discountAmount;

  return discountedPrice;
}