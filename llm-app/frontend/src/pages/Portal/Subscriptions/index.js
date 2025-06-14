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

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Rental page sections

// Routes
import footerRoutes from "footer.routes";

// Images
import portalRoutes from "routes/portal-routes";

// import Explanation from "./sections/Explanation";
// import Pricing from "./sections/Pricing";
import SubscriptionManagement from "./sections/SubscriptionManagement";
import PageHeader from "components/MYPageHeader";
import Card from "@mui/material/Card";
function Subscriptions() {
  return (
    <>
      <DefaultNavbar routes={portalRoutes} />

      <PageHeader title="Kies het abonnement dat bij je past" />
      <Card
        // ref={contentRef}
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <SubscriptionManagement />
        {/* <Pricing /> */}
        {/* <Explanation /> */}
      </Card>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Subscriptions;
