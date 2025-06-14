import { apiClient } from "./apiClient";

export const subscriptionsService = {
  getSubscriptionLevel: async () => {
    const response = await apiClient.get("/subscriptions/get-subscription-level");
    return response.data;
  },
};
