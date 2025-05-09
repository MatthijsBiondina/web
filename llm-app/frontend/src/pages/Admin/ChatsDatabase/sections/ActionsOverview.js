import Grid from "@mui/material/Grid";
import ActionCard from "components/ActionCard";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import { useState } from "react";
import clearDatabaseImage from "assets/images/admin-actions/clear-chats-database.jpg";
import { adminService } from "services/adminService";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function ActionsOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleClearDatabase = async () => {
    setIsLoading(true);
    try {
      const response = await adminService.clearChatsDatabase();
      console.log(response);

      // Set success message and open alert
      setError(""); // Clear any previous errors
      setSuccess("Database is succesvol leeggemaakt!");
      setOpenAlert(true);
    } catch (error) {
      console.error("Error clearing database:", error);

      // Set error message and open alert
      setSuccess(""); // Clear any previous success messages
      setError("Er is een fout opgetreden bij het leegmaken van de database.");
      setOpenAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const displayedCards = [
    {
      onClick: handleClearDatabase,
      image: clearDatabaseImage,
      title: "Database leegmaken",
      description: "Verwijder alle chats uit de database. Alleen bedoeld voor debug/development.",
    },
  ];

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {displayedCards.map((card, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <MKBox sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <ActionCard
                  route={card.route}
                  onClick={card.onClick}
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  disabled={isLoading}
                />
              </MKBox>
            </Grid>
          ))}
        </Grid>

        {/* Notification Alert */}
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert
            onClose={handleCloseAlert}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {error || success}
          </Alert>
        </Snackbar>
      </Container>
    </MKBox>
  );
}

export default ActionsOverview;
