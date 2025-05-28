import { useChatsAdmin } from "../contexts/ChatsAdminContext";

import MKBox from "components/MKBox";
import { CircularProgress } from "@mui/material";
import ChatsTable from "../components/ChatsTable";

function ChatsOverview() {
  const { chats, isLoading } = useChatsAdmin();

  return (
    <MKBox>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <MKBox>
          <ChatsTable chats={chats} />
        </MKBox>
      )}
    </MKBox>
  );
}

export default ChatsOverview;
