import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import Stack from "@mui/material/Stack";
import MKButton from "components/MKButton";
import { creditService } from "services/creditService";
import CircularProgress from "@mui/material/CircularProgress";
function Credits() {
  const [creditBalance, setCreditBalance] = useState({ amount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCreditBalance = async () => {
      try {
        const balance = await creditService.getBalance();
        setCreditBalance(balance);
      } catch (error) {
        console.error("Error fetching credit balance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreditBalance();
  }, []);

  return (
    <MKBox component="section" py={1}>
      <Container>
        <Grid container justifyContent="right">
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <MKButton variant="outlined" color="info">
              Tegoed: {isLoading ? <CircularProgress /> : creditBalance.amount}
            </MKButton>
          </Stack>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Credits;
