/**
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
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Images
import bgImage from "assets/images/bg-home.jpg";
import BasicLayout from "pages/Authentication/components/BasicLayout";

function Loading() {
  return (
    <BasicLayout image={bgImage}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
        <CircularProgress size={60} thickness={4} color="light" />
      </Box>
    </BasicLayout>
  );
}

export default Loading;
