// @mui material components
import Grid from "@mui/material/Grid";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React examples

import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import ProfilePicture from "./sections/ProfilePicture";
import Navbar from "./components/Navbar";
import portalRoutes from "routes/portal-routes";
import NewChat from "./sections/NewChat";
function ChatSession() {
  return (
    <>
      <Navbar routes={portalRoutes} sticky transparent />

      <Grid container spacing={3} alignItems="center">
        <ProfilePicture />

        <NewChat />
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ChatSession;
