import { useState } from "react";
import { Container, Grid, CircularProgress } from "@mui/material";
import PricingCard from "../components/PricingCard";
import MKBox from "components/MKBox";

import { useSubscriptionService } from "../hooks/useSubscriptionsService";
import { useSettings } from "hooks/useSettings";
import { useCreditPrice } from "../hooks/useCreditPrice";
function SubscriptionManagement() {
  const { settingValue: currencySymbol, loading: currencySymbolLoading } =
    useSettings("currency-symbol");
  const { creditPrice: oneTimeAccessPrice, loading: oneTimeAccessLoading } =
    useCreditPrice("one-time-access");
  const { creditPrice: oneTimeAccessPriceDiscounted, loading: oneTimeAccessLoadingDiscounted } =
    useCreditPrice("one-time-access-discounted");
  const {
    creditPrice: monthlyStandardPrice,
    creditAmount: monthlyStandardCreditAmount,
    loading: monthlyStandardLoading,
  } = useCreditPrice("subscription-standard-monthly");

  const {
    subscriptionLevel,
    subscription,
    loading: subscriptionLoading,
    createSubscription,
    cancelSubscription,
  } = useSubscriptionService();

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const loading =
    currencySymbolLoading ||
    oneTimeAccessLoading ||
    oneTimeAccessLoadingDiscounted ||
    monthlyStandardLoading ||
    subscriptionLoading ||
    actionLoading;

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    if (subscriptionLevel === "free") return;

    try {
      setActionLoading(true);
      setActionError(null);
      await cancelSubscription(subscription.id);
    } catch (error) {
      setActionError("Er is een fout opgetreden bij het opzeggen van je abonnement.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateSubscription = async (productKey) => {
    if (!subscription) return;
    if (subscriptionLevel !== "free") return;

    try {
      setActionLoading(true);
      setActionError(null);
      await createSubscription(productKey);
    } catch (error) {
      setActionError("Er is een fout opgetreden bij het aanmaken van je abonnement.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <MKBox py={6} display="flex" justifyContent="center">
          <CircularProgress size={60} />
        </MKBox>
      </Container>
    );
  }

  return (
    <MKBox component="section" py={{ xs: 0, md: 12 }}>
      <Container>
        <Grid container spacing={3} mt={6} justifyContent="center">
          {loading ? (
            <CircularProgress color="info" size={60} />
          ) : (
            <>
              <Grid item xs={12} sm={6} lg={3}>
                <PricingCard
                  variant={subscriptionLevel === "free" ? "outline" : "contained"}
                  color="dark"
                  title="Gratis"
                  description="Geen maandelijkse kosten"
                  price={{ value: `${currencySymbol}0`, type: "maand" }}
                  action={{
                    type: "internal",
                    route: "/",
                    label: subscriptionLevel === "free" ? "Nu in gebruik" : "Overstappen",
                    disabled: subscriptionLevel === "free",
                    onClick: () => handleCancelSubscription(),
                  }}
                  specifications={[
                    `${currencySymbol}${oneTimeAccessPrice} per chat-sessie`,
                    "Geen abonnement",
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <PricingCard
                  variant={subscriptionLevel === "standard" ? "outline" : "contained"}
                  color="dark"
                  title="Premium"
                  description="Bespaar bij regelmatig gebruik"
                  price={{ value: `${currencySymbol}${monthlyStandardPrice}`, type: "maand" }}
                  action={{
                    type: "internal",
                    route: "/",
                    label: subscriptionLevel === "standard" ? "Nu in gebruik" : "Overstappen",
                    disabled: subscriptionLevel === "standard",
                    onClick: () => handleCreateSubscription("subscription-standard-monthly"),
                  }}
                  specifications={[
                    `${monthlyStandardCreditAmount} gratis chat-sessies per maand`,
                    `Daarna ${currencySymbol}${oneTimeAccessPriceDiscounted} per gesprek`,
                    "Iedere maand opzegbaar",
                  ]}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default SubscriptionManagement;
