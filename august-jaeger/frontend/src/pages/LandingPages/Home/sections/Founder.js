// SwiperJS
import SwiperCore, { Autoplay, Navigation } from "swiper";

// SwiperJS react components
import { SwiperSlide } from "swiper/react";

// SwiperJS styles
import "swiper/swiper.min.css";
import "swiper/css/navigation";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import image from "assets/images/founder.jpg";

function Founder() {
  // install SwiperJS modules
  SwiperCore.use([Autoplay, Navigation]);

  return (
    <MKBox component="section" py={12} position="relative">
      <Container>
        <SwiperSlide key="founder">
          <Grid container spacing={3} alignItems="center" sx={{ mb: { xs: 6, md: 0 } }}>
            <Grid item xs={12} md={5} ml={{ xs: 0, lg: "auto" }}>
              <MKBox
                p={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MKBox
                  component="img"
                  src={image}
                  alt="Founder"
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "xl",
                    maxHeight: "37.5rem",
                  }}
                />
              </MKBox>
            </Grid>
            <Grid item xs={12} md={5} mr={{ xs: 0, lg: "auto" }} position="relative">
              <MKTypography
                component="h6"
                variant="button"
                opacity={0.7}
                textTransform="uppercase"
                fontWeight="bold"
              >
                Founder
              </MKTypography>
              <MKTypography
                variant="h1"
                fontWeight="bold"
                sx={{
                  fontSize: ({ typography: { d3, d4 } }) => ({
                    xs: d4.fontSize,
                    lg: d3.fontSize,
                  }),
                }}
              >
                Aaron Davies
              </MKTypography>
              <MKTypography variant="body1" my={3}>
                I'm an experienced headhunter with more than 30 years of experience in hiring
                diverse talent for companies across the globe.
              </MKTypography>
            </Grid>
          </Grid>
        </SwiperSlide>
      </Container>
      <MKBox component="section" py={6} mt={0}>
        <Container>
          <Grid container spacing={3} item xs={12} lg={8} mx="auto">
            <MKTypography variant="body1">
              After many years of delivering high pressure search mandates and interfacing with
              thousands of candidates, I’ve picked up a good sense of what tends to work and what
              doesn’t in terms of securing employment.
              <br /> <br />
              August Jaeger exists to help you the job seeker navigate today’s hyper-competitive job
              market.
              <br /> <br />I will equip you with the tools to fine tune or craft a compelling
              resume, develop job-winning interview skills, refine your professional presence and
              help you convey your unique personal story to hiring managers.
              <br /> <br />
              With my support, you’ll be able to confidently present your own unique value
              proposition and abilities in the best possible light, setting yourself apart in an
              exceptionally tough landscape.
              {/* <br /> <br /> */}
              {/* Together, we’ll build the tools and confidence you need to achieve your career goals */}
            </MKTypography>
          </Grid>
          {/* <MKBox mt={4} display="flex" justifyContent="center">
            <MKButton href="/about" color="dark" variant="outlined">
              Learn More
            </MKButton>
          </MKBox> */}
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default Founder;
