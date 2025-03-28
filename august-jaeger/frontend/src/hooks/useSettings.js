import { useState, useEffect } from "react";
import { settingsService } from "services/settingsService";

export const useSettings = (setting) => {
  const [settingValue, setSettingValue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSetting = async () => {
      setLoading(true);
      try {
        const settingValue = await settingsService.getSetting(setting);
        setSettingValue(settingValue);
      } catch (error) {
        console.error("Error fetching setting:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSetting();
  }, [setting]);

  return { settingValue, loading };
};
