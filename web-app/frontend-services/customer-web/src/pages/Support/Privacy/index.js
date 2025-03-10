/*
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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

function Privacy() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "internal",
          route: "/portaal",
          label: "portaal",
          color: "info",
        }}
        sticky
      />
      <MKBox component="section" pt={20} pb={12}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Card>
                <MKBox
                  variant="gradient"
                  bgColor="dark"
                  borderRadius="lg"
                  coloredShadow="dark"
                  p={3}
                  mt={-3}
                  mx={2}
                >
                  <MKTypography variant="h3" color="white">
                    Privacybeleid
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    Laatst geweizigd: 01-03-2025
                  </MKTypography>
                </MKBox>
                <MKBox pb={6} px={6}>
                  <MKTypography variant="h5" mt={6} mb={3}>
                    Inleiding
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    Welkom bij ons Privacybeleid. Wij respecteren uw privacy en zetten ons in om uw
                    persoonlijke gegevens te beschermen. Dit Privacybeleid legt uit hoe wij uw
                    persoonlijke gegevens verzamelen, gebruiken, openbaar maken, bewaren en
                    beschermen wanneer u onze website bezoekt of gebruik maakt van onze diensten.
                  </MKTypography>
                  <MKTypography variant="h5" mt={6} mb={3}>
                    Rest van het Privacybeleid
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    Lorum ipsum dolor sit amet, canis fidelis et amicus hominis, semper vigilans et
                    paratus ad officium suum. Per saecula, canis non solum socius, sed etiam custos,
                    venator, et dux fuit. A temporibus antiquis usque ad praesens, canes hominibus
                    fidem suam demonstraverunt, corda eorum devotione et amore impleverunt.
                    <br />
                    <br />
                    Latrat laetitiae cum dominum suum videt, caudam movens sicut ventus per prata
                    viridia. Catuli in sole ludunt, a matre sollicita observati, dum maiores canes
                    in umbra requiescunt, sapientiam aetatis secum portantes. Cum ludi finiti sunt
                    et nox appropinquat, canis fidem suam ostendit, domum suam custodit et auribus
                    erectis noctem vigilat.
                    <br />
                    <br />
                    In pratis apertis, canis venator vestigia ferae investigat, naribus terram
                    scrutans, oculis ardentibus et animam excitatus. Odor vestigii per silvas eum
                    ducit, donec praedam suam inveniat. Sed non solum venatio eum delectat; etiam
                    domus, familia, et amor domini sui maximam felicitatem afferunt.
                    <br />
                    <br />
                    Canis non solum vigil et protector, sed etiam hilaris comes est. Dum dominus
                    suus laborat, canis patienter exspectat, in umbra iacet, caudam leniter movens.
                    Cum vespera venit et dies longus finitur, canis ad pedes domini sui se recumbit,
                    caput in gremio ponit et somnum placidum capit.
                    <br />
                    <br />
                    Nocte serena, luna in caelo fulget, et canis ad astra ululat, vocem suam cum
                    spiritibus antiquis canum coniungens. Narrationes temporum priscorum vento
                    portantur, et ululatus eius inter montes resonat. Alii canes in longinquis pagis
                    respondent, chorus fidelium amicorum, qui vigilias nocturnas custodiunt.
                    <br />
                    <br />
                    Mane aurora oritur, et canis in campum currit, vento in auribus et laetitia in
                    corde. Nulla creatura tam fidelis, tam devota, tam amoris plena quam canis, qui
                    sine condicione dominum suum diligit. In omnibus tempestatibus, in tristitia et
                    laetitia, canis permanet amicus certus, fidus custos, et immortale testimonium
                    devotionis et affectus veri.
                  </MKTypography>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Privacy;
