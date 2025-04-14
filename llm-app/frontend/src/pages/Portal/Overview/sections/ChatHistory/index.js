import { useState, useEffect } from "react";
import { useOverview } from "pages/Portal/Overview/contexts/OverviewContext";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

import NewQuestionCard from "pages/Portal/Overview/components/cards/NewQuestionCard";
import ExistingQuestionCard from "pages/Portal/Overview/components/cards/ExistingQuestionCard";

function ChatHistory() {
  const { loading, filteredChats, pageNumber, pageSize } = useOverview();
  const [displayedCards, setDisplayedCards] = useState([]);
  const [localLoading, setLocalLoading] = useState(true); // Add a local loading state

  useEffect(() => {
    // Only update displayed cards if not loading
    if (!loading) {
      if (pageNumber === 1) {
        setDisplayedCards([
          <NewQuestionCard key={0} />,
          ...filteredChats
            .slice(0, pageSize - 1)
            .map((chat, index) => <ExistingQuestionCard key={index + 1} chat={chat} />),
        ]);
      } else {
        const startIndex = (pageNumber - 1) * pageSize - 1;
        const endIndex = startIndex + pageSize;
        setDisplayedCards(
          filteredChats
            .slice(startIndex, endIndex)
            .map((chat, index) => <ExistingQuestionCard key={index} chat={chat} />)
        );
      }
      // Only set localLoading to false after displayedCards has been updated
      setLocalLoading(false);
    } else {
      // Reset local loading state when main loading state changes to true
      setLocalLoading(true);
    }
  }, [filteredChats, pageNumber, loading]);

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {loading || localLoading ? (
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
              <MKBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
              >
                <CircularProgress size={40} />
              </MKBox>
            </Grid>
          ) : (
            <>
              {displayedCards.length > 0 ? (
                displayedCards.map((card, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <MKBox
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {card}
                    </MKBox>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} display="flex" justifyContent="center">
                  <MKBox py={3}>
                    <NewQuestionCard />
                  </MKBox>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default ChatHistory;
