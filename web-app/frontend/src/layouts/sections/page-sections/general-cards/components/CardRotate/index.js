/*
=========================================================
* Material Kit 2 PRO React - v2.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function CardRotate() {
  return (
    <MKBox pt={6} pb={3} px={3}>
      <Grid container item xs={12} lg={6} sx={{ mx: "auto", px: { xs: 0, lg: 6 } }}>
        <RotatingCard>
          <RotatingCardFront
            image={bgFront}
            icon="touch_app"
            title={
              <>
                Feel the
                <br />
                Material Kit
              </>
            }
            description="All the MUI components that you need in a development have been re-design with the new look."
          />
          <RotatingCardBack
            image={bgBack}
            title="Discover More"
            description="You will save a lot of time going from prototyping to full-functional code because all elements are implemented."
            action={{ type: "internal", route: "/", label: "start with header" }}
          />
        </RotatingCard>
      </Grid>
    </MKBox>
  );
}

export default CardRotate;
