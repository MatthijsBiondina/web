import { Container, Grid, Stack } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Icon from "@mui/material/Icon";
import SubscriptionOption from "../../components/SubscriptionOption";
function Subscription() {
  return (
    <MKBox component="section" py={{ xs: 3, md: 12 }}>
      <Container>
        <Grid container>
          <Grid item xs={12} lg={5}>
            <MKTypography variant="h3" my={1}>
              Gebruik je de chatbot vaker?
            </MKTypography>
            <MKTypography variant="body2" color="text" mb={2}>
              Bespaar met een abonnement!
            </MKTypography>
            <MKTypography
              component="a"
              href="/portaal/abonnementen"
              variant="button"
              color="info"
              fontWeight="regular"
              sx={{
                width: "max-content",
                display: "flex",
                alignItems: "center",

                "& .material-icons-round": {
                  fontSize: "1.125rem",
                  transform: "translateX(3px)",
                  transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                },

                "&:hover .material-icons-round, &:focus .material-icons-round": {
                  transform: "translateX(6px)",
                },
              }}
            >
              Bekijk onze abonnementen
              <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ ml: { xs: -2, lg: "auto" }, mt: { xs: 6, lg: 0 } }}>
            <Stack>
              <SubscriptionOption icon="done" content={<>Lagere prijs per gesprek</>} />
              <SubscriptionOption
                icon="done"
                content={<>Geen losse betalingen nodig - direct toegang</>}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Subscription;
