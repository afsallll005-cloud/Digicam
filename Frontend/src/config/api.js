// Centralized API Configuration for DIGICAM Store
// In Development: defaults to http://localhost:5000
// In Production (Vercel): can be configured via VITE_API_URL environment variable

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

/**
 * Returns full API endpoint URL
 * @param {string} endpoint - e.g. "/listProduct"
 */
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

/**
 * Resolves product image URL safely
 * @param {string} imagePath - image filename or relative path
 */
export const getImageUrl = (imagePath, fallback = "/images/Cam01.png") => {
  if (!imagePath) return fallback;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  if (imagePath.startsWith("./images/")) {
    return imagePath.replace("./images/", "/images/");
  }
  if (imagePath.startsWith("/")) {
    return imagePath;
  }
  return `${API_BASE_URL}/images/${imagePath}`;
};
