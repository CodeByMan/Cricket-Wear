const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:5000";

export const normalizeImageUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  const value = url.trim();
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (value.startsWith("/")) return `${API_ORIGIN}${value}`;
  return value;
};

export const getProductImageUrl = (product) =>
  normalizeImageUrl(product?.images?.[0]?.url);
