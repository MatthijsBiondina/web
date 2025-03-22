// @mui material components
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Custom components
import ChatSection from "components/MYChatSection"; // Import the new component

// Routes
import portalRoutes from "routes/portal-routes";
import footerRoutes from "footer.routes";

// Services
import { creditService } from "services/creditService";

// Image
import bgImage from "assets/images/conversation/profile-picture.jpg";

function Conversation() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkCredits = async () => {
      try {
        const creditCheck = await creditService.checkSufficientCredits("chat-session");

        if (!creditCheck.sufficient) {
          // Redirect to credits page if insufficient
          navigate("/portaal/credits-aanschaffen", {
            state: {
              from: location.pathname,
              message: "INSUFFICIENT_CREDITS",
            },
          });
        }
      } catch (error) {
        console.error("Error checking credit balance:", error);
      } finally {
        setLoading(false);
      }
    };

    checkCredits();
  }, [navigate, location]);

  if (loading) {
    return (
      <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        {/* You could add a loading spinner here */}
        Loading...
      </MKBox>
    );
  }

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar routes={portalRoutes} />
      </MKBox>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <MKBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Grid>

        {/* Chat section is now a separate component */}
        <ChatSection />
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Conversation;
