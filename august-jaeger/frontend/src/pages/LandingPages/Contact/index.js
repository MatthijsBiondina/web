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
import CenteredFooter from "examples/Footers/CenteredFooter";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import ContactDetails from "./sections/ContactDetails";
// Images

function Contact() {
  return (
    <>
      <DefaultNavbar routes={routes} />
      <MYPageHeader title="Contact Us" />
      <ContactDetails />
      <CenteredFooter />
    </>
  );
}

export default Contact;
