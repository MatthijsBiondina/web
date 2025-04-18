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

import Explanation from "./sections/Explanation";
import Pricing from "./sections/Pricing";
import PageHeader from "components/MYPageHeader";

function Subscriptions() {
  return (
    <>
      <DefaultNavbar routes={portalRoutes} />

      <PageHeader title="Kies het abonnement dat bij je past" />

      <MKBox p={3}>
        <Explanation />
        <Pricing />
      </MKBox>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Subscriptions;
