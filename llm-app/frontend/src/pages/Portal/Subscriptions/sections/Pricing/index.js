import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKBadge from "components/MKBadge";
// Material Kit 2 PRO React examples
import DefaultPricingCard from "examples/Cards/PricingCards/DefaultPricingCard";

import { useCreditPrice } from "../../hooks/useCreditPrice";
import { useSettings } from "hooks/useSettings";
// Imags
import bgImage from "assets/images/portal-actions/manage-account.jpg";
// const bgImage =
//   "https://images.unsplash.com/photo-1467541473380-93479a5a3ffa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2246&amp;q=80";

function Pricing() {
  const { settingValue: currencySymbol, loading: currencySymbolLoading } =
    useSettings("currency-symbol");
  const {
    creditPrice: oneTimeAccessPrice,

    loading: oneTimeAccessLoading,
  } = useCreditPrice("one-time-access");
  const { creditPrice: oneTimeAccessPriceDiscounted, loading: oneTimeAccessLoadingDiscounted } =
    useCreditPrice("one-time-access-discounted");
  const {
    creditPrice: monthlyStandardPrice,
    creditAmount: monthlyStandardCreditAmount,
    loading: monthlyStandardLoading,
  } = useCreditPrice("subscription-standard-monthly");
  const { creditPrice: yearlyStandardPrice, loading: yearlyStandardLoading } = useCreditPrice(
    "subscription-standard-yearly"
  );
  const { creditPrice: monthlyPremiumPrice, loading: monthlyPremiumLoading } = useCreditPrice(
    "subscription-premium-monthly"
  );
  const { creditPrice: yearlyPremiumPrice, loading: yearlyPremiumLoading } = useCreditPrice(
    "subscription-premium-yearly"
  );

  const loading =
    oneTimeAccessLoading ||
    oneTimeAccessLoadingDiscounted ||
    monthlyStandardLoading ||
    yearlyStandardLoading ||
    monthlyPremiumLoading ||
    yearlyPremiumLoading ||
    currencySymbolLoading;

  const [activeTab, setActiveTab] = useState(0);
  const [tabType, setTabType] = useState("monthly");

  const handleTabType = ({ currentTarget }, newValue) => {
    setActiveTab(newValue);
    setTabType(currentTarget.id);
  };

  return (
    <MKBox component="section" py={{ xs: 0, lg: 7 }}>
      <MKBox
        borderRadius="xl"
        shadow="lg"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container sx={{ pb: { xs: 12, lg: 22 }, pt: 12 }}>
          <Grid
            container
            item
            flexDirection="column"
            alignItems="center"
            xs={12}
            md={8}
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKBadge
              badgeContent="Abonnementen"
              variant="gradient"
              container
              color="dark"
              sx={{ mb: 1 }}
            />
            <MKTypography variant="h3" color="white" mb={2}>
              Bekijk ons aanbod
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      {loading ? (
        <CircularProgress color="info" size={60} />
      ) : (
        <>
          <MKBox mt={-16}>
            <Container>
              <Grid container sx={{ mb: 6 }}>
                <Grid item xs={7} md={6} lg={4} sx={{ mx: "auto", textAlign: "center" }}>
                  <AppBar position="static">
                    <Tabs value={activeTab} onChange={handleTabType}>
                      <Tab
                        id="monthly"
                        label={
                          <MKBox py={0.5} px={2} color="inherit">
                            Maandelijks
                          </MKBox>
                        }
                      />
                      <Tab
                        id="annual"
                        label={
                          <MKBox py={0.5} px={2} color="inherit">
                            Jaarlijks
                          </MKBox>
                        }
                      />
                    </Tabs>
                  </AppBar>
                </Grid>
              </Grid>
              <MKBox position="relative" zIndex={10} px={{ xs: 1, sm: 0 }}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} lg={4}>
                    <DefaultPricingCard
                      badge={{ color: "light", label: "gratis" }}
                      price={{
                        currency: currencySymbol,
                        value: tabType === "annual" ? 0 : 0,
                        type: tabType === "annual" ? "jaar" : "maand",
                      }}
                      specifications={[
                        {
                          label: `${currencySymbol}${oneTimeAccessPrice} per chat-sessie`,
                          includes: true,
                        },
                        { label: "Geen abonnement", includes: true },
                        {},
                      ]}
                      action={{
                        type: "internal",
                        route: "/",
                        color: "dark",
                        label: "join",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <DefaultPricingCard
                      color="dark"
                      badge={{ color: "info", label: "standaard" }}
                      price={{
                        currency: currencySymbol,
                        value: tabType === "annual" ? yearlyStandardPrice : monthlyStandardPrice,
                        type: tabType === "annual" ? "jaar" : "maand",
                      }}
                      specifications={[
                        {
                          label: `${monthlyStandardCreditAmount} gratis chat-sessies per maand`,
                          includes: true,
                        },
                        {
                          label: `Daarna ${currencySymbol}${oneTimeAccessPriceDiscounted} per gesprek`,
                          includes: true,
                        },
                        { label: "Direct opzegbaar", includes: true },
                      ]}
                      action={{
                        type: "internal",
                        route: "/",
                        color: "info",
                        label: "try premium",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <DefaultPricingCard
                      badge={{ color: "light", label: "premium" }}
                      price={{
                        currency: currencySymbol,
                        value: tabType === "annual" ? yearlyPremiumPrice : monthlyPremiumPrice,
                        type: tabType === "annual" ? "jaar" : "maand",
                      }}
                      specifications={[
                        { label: "Onbeperkt toegang tot de chatbot", includes: true },
                        { label: "Personal Coaching met Professor Dog", includes: true },
                        { label: "Direct opzegbaar", includes: true },
                      ]}
                      action={{
                        type: "internal",
                        route: "/",
                        color: "dark",
                        label: "join",
                      }}
                    />
                  </Grid>
                </Grid>
              </MKBox>
            </Container>
          </MKBox>
        </>
      )}
    </MKBox>
  );
}

export default Pricing;
