/**
 * Configuration for the microservices API endpoints.
 * Uses Vite environment variables for flexibility between Local and Cloud.
 */

const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || "http://localhost:3003";

export const API_CONFIG = {
  AUTH_SERVICE: API_BASE_URL,
  PRODUCT_SERVICE: `${API_BASE_URL}/api`, // Gateway usually prefixes or routes to /products
  // In the gateway overhaul, we used /auth, /products, /orders
};
