import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import adminRoutes from "routes/admin-routes";
import PageHeader from "./sections/PageHeader";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
import ActionsOverview from "./sections/ActionsOverview";
import DefaultFooter from "examples/Footers/DefaultFooter";
import ChatsOverview from "./sections/ChatsOverview";
import { ChatsAdminProvider } from "./contexts/ChatsAdminContext";

function ChatsDatabase() {
  return (
    <>
      <DefaultNavbar routes={adminRoutes} />
      <PageHeader />
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          overflow: "hidden",
        }}
      >
        <ChatsAdminProvider>
          <ChatsOverview />
          <ActionsOverview />
        </ChatsAdminProvider>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ChatsDatabase;
