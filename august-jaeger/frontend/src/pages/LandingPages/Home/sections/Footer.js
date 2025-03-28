// @mui icons

// Material Kit 2 PRO React examples
import CenteredFooter from "examples/Footers/CenteredFooter";

function Footer() {
  const links = [
    { href: "/home", name: "Home" },
    { href: "/about-us", name: "About" },

    { href: "/contact", name: "Contact" },
  ];

  return <CenteredFooter links={links} />;
}

export default Footer;
