import MKTypography from "components/MKTypography";
import MKAvatar from "components/MKAvatar";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import Table from "examples/Tables/Table";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import MKBadge from "components/MKBadge";
function User({ photoUrl, name, email }) {
  return (
    <MKBox display="flex" alignItems="center" px={1} py={0.5}>
      <MKBox mr={2}>
        <MKAvatar src={photoUrl} alt={name} size="sm" variant="rounded" />
      </MKBox>
      <MKBox display="flex" flexDirection="column">
        <MKTypography variant="button" fontWeight="medium">
          {name}
        </MKTypography>
        <MKTypography variant="caption" color="secondary">
          {email}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

User.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

function Subject({ subject, createdAt }) {
  return (
    <MKBox display="flex" flexDirection="column">
      <MKTypography variant="caption" fontWeight="medium" color="text">
        {subject}
      </MKTypography>
      <MKTypography variant="caption" color="secondary">
        {/* // convert date like 2025-05-28T11:27:36.538000 to 28-05-2025 11:27 */}
        {new Date(createdAt).toLocaleDateString("nl-NL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </MKTypography>
    </MKBox>
  );
}

Subject.propTypes = {
  subject: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

function Status({ status }) {
  // different colors for pending, success, failed, critical
  let color;
  switch (status) {
    case "pending":
      color = "info";
      break;
    case "success":
      color = "success";
      break;
    case "failed":
      color = "warning";
      break;
    case "critical":
      color = "error";
      break;
    default:
      color = "";
      break;
  }

  return <MKBadge variant="contained" badgeContent={status} color={color} size="xs" container />;
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

function EmailSent({ emailSent, status }) {
  let color = "light";
  let message = "n.v.t.";

  if (status === "failed") {
    switch (emailSent) {
      case true:
        color = "success";
        message = "Ja";
        break;
      case false:
        color = "warning";
        message = "Nee";
        break;
    }
  }
  return <MKBadge variant="contained" badgeContent={message} color={color} size="xs" container />;
}

EmailSent.propTypes = {
  emailSent: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};

function ChatsTable({ chats }) {
  const columns = [
    { name: "gebruiker", align: "left" },
    { name: "onderwerp", align: "left" },
    { name: "berichtstatus", align: "center" },
    { name: "email verstuurd", align: "center" },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(chats);
    if (chats.length > 0) {
      setRows(
        chats.map((chat) => ({
          gebruiker: (
            <User photoUrl={chat.userPhotoUrl} name={chat.userName} email={chat.userEmail} />
          ),
          onderwerp: <Subject subject={chat.subject} createdAt={chat.createdAt} />,
          berichtstatus: <Status status={chat.status} />,
          "email verstuurd": <EmailSent emailSent={chat.emailSent} status={chat.status} />,
        }))
      );
    }
  }, [chats]);

  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container item xs={12} lg={10} mx="auto">
          <Table columns={columns} rows={rows} />
        </Grid>
      </Container>
    </MKBox>
  );
}

ChatsTable.propTypes = {
  chats: PropTypes.array.isRequired,
};

export default ChatsTable;
