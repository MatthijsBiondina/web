// MUI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress"; // Add this import

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Card from "@mui/material/Card";
import MKButton from "components/MKButton";
import Icon from "@mui/material/Icon";
import { useSettings } from "hooks/useSettings";
import { useOneTimeAccessPrice } from "pages/Portal/BuyCredits/hooks/useOneTimeAccessPrice";
import { apiClient } from "services/apiClient";
function PricingCard() {
  const { settingValue: currencySymbol, loading: currencySymbolLoading } =
    useSettings("currency-symbol");
  const { oneTimeAccessPrice, loading: oneTimeAccessPriceLoading } = useOneTimeAccessPrice();
  const loading = currencySymbolLoading || oneTimeAccessPriceLoading;

  const handleGetAccess = async () => {
    try {
      // Call your backend endpoint
      const response = await apiClient.post("/orders/one-time-access");

      const data = response.data;

      // Redirect to Mollie payment page
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      // Handle error appropriately
    }
  };

  return (
    <Container>
      <Grid container item xs={12}>
        <Card sx={{ width: "100%" }}>
          <Grid container alignItems="center">
            {loading ? (
              <Grid item xs={12}>
                <MKBox
                  py={6}
                  px={4}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress color="info" size={60} />
                </MKBox>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} lg={4}>
                  <MKBox p={3} textAlign="center">
                    <MKTypography variant="h1">
                      <MKBox component="small">{currencySymbol}</MKBox>
                      {oneTimeAccessPrice}
                    </MKTypography>
                    <MKButton
                      variant="gradient"
                      color="info"
                      size="large"
                      sx={{ my: 2 }}
                      onClick={handleGetAccess}
                    >
                      Betalen
                    </MKButton>
                  </MKBox>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <MKBox py={3} px={4}>
                    <MKTypography variant="h3" mb={1}>
                      Eenmalige Toegang
                    </MKTypography>
                    <MKTypography variant="body2" color="text" fontWeight="regular">
                      Wil je snel hulp of antwoord op je vragen? Voor slechts {currencySymbol}
                      {oneTimeAccessPrice} krijg je direct toegang tot een één-op-één chatsessie met
                      onze chatbot. Geen abonnement nodig, gewoon eenmalig betalen en beginnen.
                    </MKTypography>
                    <Grid container item xs={12} lg={3} sx={{ mt: 6, mb: 1 }}>
                      <MKTypography variant="h6">Wat krijg je?</MKTypography>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <MKBox display="flex" py={1} pr={1} lineHeight={0}>
                          <MKTypography variant="body1" color="dark">
                            <Icon sx={{ fontWeight: "bold" }}>done</Icon>
                          </MKTypography>
                          <MKTypography variant="body2" color="text" fontWeight="regular" pl={1}>
                            Direct starten met de chatbot
                          </MKTypography>
                        </MKBox>
                        <MKBox display="flex" py={1} pr={1} lineHeight={0}>
                          <MKTypography variant="body1" color="dark">
                            <Icon sx={{ fontWeight: "bold" }}>done</Icon>
                          </MKTypography>
                          <MKTypography variant="body2" color="text" fontWeight="regular" pl={1}>
                            Krijg direct antwoord op je vragen
                          </MKTypography>
                        </MKBox>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MKBox display="flex" py={1} pr={1} lineHeight={0}>
                          <MKTypography variant="body1" color="dark">
                            <Icon sx={{ fontWeight: "bold" }}>done</Icon>
                          </MKTypography>
                          <MKTypography variant="body2" color="text" fontWeight="regular" pl={1}>
                            Geen verplichtingen, geen abonnement
                          </MKTypography>
                        </MKBox>
                      </Grid>
                    </Grid>
                  </MKBox>
                </Grid>
              </>
            )}
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
}

export default PricingCard;
