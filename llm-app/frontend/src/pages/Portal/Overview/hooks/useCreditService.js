import { useState, useEffect } from "react";
import { creditService } from "services/creditService";

const useGetBalance = () => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await creditService.getBalance();
      setBalance(balance.amount);
    };
    fetchBalance();
  }, []);

  return balance;
};

export default useGetBalance;
