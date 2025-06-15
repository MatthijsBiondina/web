import { apiClient } from "./apiClient";

export const subscriptionsService = {
  // Get subscription status (current active subscription)
  getSubscription: async () => {
    try {
      const response = await apiClient.get("/subscriptions/status");
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      throw error;
    }
  },

  // Create a new subscription
  async createSubscription(productKey, startDate = null) {
    try {
      const response = await apiClient.post("/subscriptions/create", {
        productKey,
        startDate,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  },

  // Cancel a subscription
  async cancelSubscription(subscriptionId) {
    try {
      const response = await apiClient.post("/subscriptions/cancel", {
        subscriptionId,
      });
      return response.data;
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw error;
    }
  },

  // Get a subscription by ID
  async getSubscriptionById(subscriptionId) {
    try {
      const response = await apiClient.get(`/subscriptions/${subscriptionId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription by ID:", error);
      throw error;
    }
  },
};
