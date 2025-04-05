// @mui material components
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import portalRoutes from "routes/portal-routes";
import footerRoutes from "footer.routes";

// Services
import { creditService } from "services/creditService";

// Components
import ChatSessionSidebar from "./sections/ChatSessionSidebar";
import LoadingScreen from "./sections/LoadingScreen";
import ChatSection from "./sections/ChatSection";

function ChatSession() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkCredits = async () => {
      try {
        const creditCheck = await creditService.checkSufficientCredits("chat-session");

        if (!creditCheck.sufficient) {
          // Redirect to credits page if insufficient
          navigate("/portaal/eenmalige-toegang", {
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
    return <LoadingScreen />;
  }

  return (
    <>
      {/* <DefaultNavbar routes={portalRoutes} sticky transparent /> */}

      <Grid container spacing={3} alignItems="center">
        <ChatSessionSidebar />

        {/* Chat section is now a separate component */}
        <ChatSection />
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ChatSession;
