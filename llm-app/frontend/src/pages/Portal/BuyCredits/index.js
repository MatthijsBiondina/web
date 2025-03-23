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
import Card from "@mui/material/Card";

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
import PricingCard from "./sections/PricingCard";
import Subscription from "./sections/Subscription";
import PageHeader from "components/MYPageHeader";

function BuyCredits() {
  return (
    <>
      <DefaultNavbar routes={portalRoutes} />

      <PageHeader title="Start een gesprek met onze Chatbot" />

      <MKBox py={6}>
        <PricingCard />
      </MKBox>

      <Subscription />

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default BuyCredits;
