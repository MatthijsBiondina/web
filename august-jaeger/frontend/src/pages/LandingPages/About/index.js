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

// Material Kit 2 PRO React components

// Material Kit 2 PRO React examples
import MYPageHeader from "components/MYPageHeader";
import Bibliographies from "./sections/Bibliographies";
import ScheduleMeeting from "./sections/ScheduleMeeting";
import CenteredFooter from "examples/Footers/CenteredFooter";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
// Images

function About() {
  return (
    <>
      <DefaultNavbar routes={routes} />
      <MYPageHeader title="About Us" />
      <Bibliographies />
      <ScheduleMeeting />
      <CenteredFooter />
    </>
  );
}

export default About;
