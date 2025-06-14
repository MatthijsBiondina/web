import Icon from "@mui/material/Icon";

const portalRoutes = [
  {
    name: "account",
    icon: <Icon>contacts</Icon>,
    collapse: [
      { name: "mijn abonnement", route: "/portaal/abonnementen" },
      {
        name: "uitloggen",
        route: "/authenticatie/uitloggen",
      },
    ],
  },
];

export default portalRoutes;
