// @mui material components
import Grid from "@mui/material/Grid";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import CircularProgress from "@mui/material/CircularProgress";
// Material Kit 2 PRO React examples

import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import ProfilePicture from "./sections/ProfilePicture";
import Navbar from "./components/Navbar";
import portalRoutes from "routes/portal-routes";
import NewChat from "./sections/NewChat";
import ExistingChat from "./sections/ExistingChat";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChatProvider } from "./contexts/ChatContext";
function ChatSession() {
  const location = useLocation();
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlChatId = params.get("chatId");

    if (urlChatId) {
      setChatId(urlChatId);
    }
    setLoading(false);
  }, [location.search]);

  return (
    <>
      <ChatProvider>
        <Navbar routes={portalRoutes} sticky transparent />

        <Grid container spacing={3} alignItems="center">
          <ProfilePicture />

          {loading ? <CircularProgress /> : chatId ? <ExistingChat chatId={chatId} /> : <NewChat />}
        </Grid>
        <MKBox pt={6} px={1} mt={6}>
          <DefaultFooter content={footerRoutes} />
        </MKBox>
      </ChatProvider>
    </>
  );
}

export default ChatSession;
