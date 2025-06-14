import { useState, useEffect } from "react";
import { subscriptionsService } from "services/subscriptionsService";

export const useSubscriptionService = () => {
  const [subscriptionLevel, setSubscriptionLevel] = useState(null);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const statusData = await subscriptionsService.getSubscription();
      setSubscriptionLevel(statusData.subscriptionLevel);
      setSubscriptionActive(statusData.subscriptionActive);
      setSubscription(statusData.activeSubscription);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (productKey, startDate = null) => {
    try {
      setLoading(true);
      const response = await subscriptionsService.createSubscription(productKey, startDate);

      // Redirect to Mollie checkout page
      if (response.url) {
        window.location.href = response.url;
      }

      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (subscriptionId) => {
    try {
      setLoading(true);
      await subscriptionsService.cancelSubscription(subscriptionId);

      await fetchSubscription();

      return true;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  return {
    subscriptionLevel,
    subscriptionActive,
    subscription,
    loading,
    error,
    createSubscription,
    cancelSubscription,
  };
};
