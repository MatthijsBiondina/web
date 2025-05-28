import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import useGetAllChatsAdmin from "../hooks/useChatService";

const ChatsAdminContext = createContext();

export const ChatsAdminProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [nrOfPages, setNrOfPages] = useState(0);
  const [nrOfChats, setNrOfChats] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchedChats, totalPages, totalChats } = useGetAllChatsAdmin();

  useEffect(() => {
    setChats(fetchedChats);
    setNrOfPages(totalPages);
    setNrOfChats(totalChats);
    setIsLoading(false);
  }, [fetchedChats]);

  return (
    <ChatsAdminContext.Provider value={{ chats, isLoading, nrOfPages, nrOfChats }}>
      {children}
    </ChatsAdminContext.Provider>
  );
};

ChatsAdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useChatsAdmin = () => useContext(ChatsAdminContext);
