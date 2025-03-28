// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React examples
import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";

// Images

function Testimonials() {
  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={6} justifyContent="center" mx="auto" textAlign="center">
          <MKTypography variant="h2" mb={2}>
            Client Testimonials
          </MKTypography>
        </Grid>
        <Grid container spacing={3} mt={8}>
          <Grid item xs={12} md={8} lg={4} mb={{ xs: 3, lg: 0 }}>
            <DefaultReviewCard
              name="Alejandro B"
              review="I would highly recommend working with August Jaeger – it has been an outstanding experience. I am sincerely grateful to Aaron Davies for his exceptional support and guidance. Not only did he do an excellent job refining my executive presence, but he also provided invaluable career advice and tailored strategies. Thanks to Aaron's expertise, I now feel significantly more confident in presenting myself and navigating the career redirection I am pursuing."
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={4} mb={{ xs: 3, lg: 0 }}>
            <DefaultReviewCard
              color="info"
              name="Rola A"
              review="I worked with August Jaeger when preparing to step into a Leadership role. I wanted a fresh perspective as to how I can present the breadth of experience that I had whilst staying authentic to my journey. Aaron was brilliant in coaching me how to polish my value proposition and bring forward the impact I’d built over the years. I most appreciated the proactive level of support and genuine care for my success."
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={4} mb={{ xs: 3, lg: 0 }}>
            <DefaultReviewCard
              name="Nick L"
              review="August Jaeger effectively combines the role of wingman, advocate, sound board and therapist in one highly impactful package. Having faced a toxic environment which was having a major effect on my well-being, August Jaeger’s empathetic, yet pragmatic approach paid dividends in helping me to better define my individual value proposition and to summon the confidence to make the necessary changes, all of which led me to securing my next role in the C-suite."
              rating={4.5}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 6 }} />
      </Container>
    </MKBox>
  );
}

export default Testimonials;
