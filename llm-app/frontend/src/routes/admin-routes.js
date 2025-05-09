import Icon from "@mui/material/Icon";

const adminRoutes = [
  {
    name: "databases",
    icon: <Icon>storage</Icon>,
    collapse: [
      {
        name: "gebruikers",
        route: "/admin/databases/users",
      },
    ],
  },
  {
    name: "account",
    icon: <Icon>contacts</Icon>,
    collapse: [
      {
        name: "uitloggen",
        route: "/authenticatie/uitloggen",
      },
    ],
  },
];

export default adminRoutes;
