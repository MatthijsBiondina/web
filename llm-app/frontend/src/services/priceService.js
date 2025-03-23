import { apiClient } from "./apiClient";

export const priceService = {
  getCreditPrice: async (product) => {
    try {
      const response = await apiClient.get(`/prices/credit-price?product=${product}`);
      return response.data;
    } catch (error) {
      console.error("Error getting credit price:", error);
      return { price: "⁉️", error: "Error getting credit price" };
    }
  },
};
