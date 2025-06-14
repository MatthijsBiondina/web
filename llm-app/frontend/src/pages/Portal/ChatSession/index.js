// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import CircularProgress from "@mui/material/CircularProgress";
// Material Kit 2 PRO React examples

import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import ProfilePicture from "./sections/ProfilePicture";
import NewChat from "./sections/NewChat";
import ExistingChat from "./sections/ExistingChat";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChatProvider } from "./contexts/ChatContext";
import MKButton from "components/MKButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

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

  const navigate = useNavigate();

  return (
    <>
      <ChatProvider>
        <Tooltip title="Je kunt later terugkomen en het gesprek voortzetten." placement="right">
          <MKButton
            sx={{
              position: "fixed",
              top: "3rem",
              left: "3rem",
              zIndex: 100000,
            }}
            onClick={() => navigate("/portaal")}
            variant="gradient"
            color="white"
          >
            <NavigateBeforeIcon sx={{ mr: 1 }} /> Terug
          </MKButton>
        </Tooltip>

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
