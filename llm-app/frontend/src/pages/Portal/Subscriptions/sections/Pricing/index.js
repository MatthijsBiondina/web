// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React examples
import PricingCard from "../../components/PricingCard";

import { useCreditPrice } from "../../hooks/useCreditPrice";
import { useSubscriptionsService } from "../../hooks/useSubscriptionsService";
import { useSettings } from "hooks/useSettings";

function Pricing() {
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
  const { subscriptionLevel, loading: subscriptionLevelLoading } = useSubscriptionsService();

  const loading =
    oneTimeAccessLoading ||
    oneTimeAccessLoadingDiscounted ||
    monthlyStandardLoading ||
    currencySymbolLoading ||
    subscriptionLevelLoading;

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
                  }}
                  specifications={[
                    `${monthlyStandardCreditAmount} gratis chat-sessies per maand`,
                    `Daarna ${currencySymbol}${oneTimeAccessPriceDiscounted} per gesprek`,
                    "Direct opzegbaar",
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

export default Pricing;
