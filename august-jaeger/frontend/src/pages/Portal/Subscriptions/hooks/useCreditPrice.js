import { useState, useEffect } from "react";
import { priceService } from "services/priceService";

export const useCreditPrice = (product) => {
  const [creditPrice, setCreditPrice] = useState(null);
  const [creditAmount, setCreditAmount] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreditPrice = async () => {
      try {
        const response = await priceService.getCreditPrice(product);

        setCreditPrice(response.price);
        setCreditAmount(response.credits);
        setCurrencySymbol(response.currency);
      } catch (error) {
        console.error("Error fetching credit price:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditPrice();
  }, []);

  return { creditPrice, creditAmount, currencySymbol, loading };
};
