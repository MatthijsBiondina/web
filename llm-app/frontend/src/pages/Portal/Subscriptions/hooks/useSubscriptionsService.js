import { useState, useEffect } from "react";
import { subscriptionsService } from "services/subscriptionsService";

export const useSubscriptionsService = () => {
  const [subscriptionLevel, setSubscriptionLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionLevel = async () => {
      try {
        const response = await subscriptionsService.getSubscriptionLevel();
        setSubscriptionLevel(response);
      } catch (error) {
        console.error("Error fetching subscription level:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionLevel();
  }, []);

  return { subscriptionLevel, loading };
};
