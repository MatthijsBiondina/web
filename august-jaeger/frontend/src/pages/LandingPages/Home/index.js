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
import PageHeader from "./sections/PageHeader";
import Founder from "./sections/Founder";
import Cta from "./sections/CTA";
import Testimonials from "./sections/Testimonials";
import CenteredFooter from "examples/Footers/CenteredFooter";

// Images

function Home() {
  return (
    <>
      <PageHeader />
      <Founder />
      <Cta />
      <Testimonials />
      <CenteredFooter />
    </>
  );
}

export default Home;
