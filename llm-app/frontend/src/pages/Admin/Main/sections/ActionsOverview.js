import Grid from "@mui/material/Grid";
import ActionCard from "components/ActionCard";

import MKBox from "components/MKBox";
import Container from "@mui/material/Container";

import databaseImage from "assets/images/admin-actions/database.jpg";
import usersImage from "assets/images/admin-actions/gebruikers.jpg";
function ActionsOverview() {
  const displayedCards = [
    {
      route: "/admin/chats-database",
      image: databaseImage,
      title: "Chats Database",
      description: "Bekijk en beheer alle chats",
    },
    {
      route: "/admin/users-database",
      image: usersImage,
      title: "Gebruikers Database",
      description: "Bekijk en beheer alle gebruikers",
    },
  ];

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {displayedCards.map((card) => (
            <Grid item xs={12} md={6} lg={4} key={card.route}>
              <MKBox sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <ActionCard
                  route={card.route}
                  image={card.image}
                  title={card.title}
                  description={card.description}
                />
              </MKBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default ActionsOverview;
