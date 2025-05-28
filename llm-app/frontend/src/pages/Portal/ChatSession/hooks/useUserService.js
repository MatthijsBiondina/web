import { useState } from "react";
import { userService } from "services/userService";

const useUserService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await userService.getProfile();
      return response;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getUserProfile, loading, error };
};

export default useUserService;
