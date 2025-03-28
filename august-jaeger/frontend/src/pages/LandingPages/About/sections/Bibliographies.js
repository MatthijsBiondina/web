// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "assets/images/aaron.jpg";
import team2 from "assets/images/robin.jpg";

function Bibliographies() {
  return (
    <MKBox component="section" position="relative" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} lg={6} alignItems="stretch">
            <MKBox mb={1} sx={{ height: "100%" }}>
              <HorizontalTeamCard
                image={team1}
                name="Aaron Davies"
                // position={{ color: "dark", label: "UI Designer" }}
                description="Aaron Davies is an experienced business owner and entrepreneur who sits at the intersection of AI Innovation, Executive Search and Career Guidance. Having founded global search firm Jurupa in 2013, he has built a wealth of experience in executing and delivering numerous high-stakes search mandates globally. Building on 15+ years in the search industry, Aaron Davies created August Jaeger, a holistically focused career navigation consultancy with the mission of creating measurable impact and tangible value for senior professionals facing a career transition."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6} alignItems="stretch">
            <MKBox mb={1} sx={{ height: "100%" }}>
              <HorizontalTeamCard
                image={team2}
                name="Robin Lewis"
                position={{ color: "info", label: "Boss" }}
                description="Robin has over 25 years' experience of coaching leaders and  teams and leading strategic organisational transformation and change. In the M&A field, Robin has managed the people strategy for multiple acquisitions, integrations, and divestments, ranging in scale from large corporate acquisitions to integrating and growing early-stage entrepreneurial start-ups."
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Bibliographies;
