import { useState, useEffect } from "react";
import { priceService } from "services/priceService";

export const useOneTimeAccessPrice = () => {
  const [oneTimeAccessPrice, setOneTimeAccessPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOneTimeAccessPrice = async () => {
      try {
        const response = await priceService.getOneTimeAccessPrice();
        setOneTimeAccessPrice(response.price);
      } catch (error) {
        console.error("Error fetching one-time access price:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOneTimeAccessPrice();
  }, []);

  return { oneTimeAccessPrice, loading };
};
