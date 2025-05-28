import { useState, useEffect } from "react";
import { chatService } from "services/chatService";

const useGetAllChatsAdmin = (pageNumber = 1) => {
  const [fetchedChats, setFetchedChats] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalChats, setTotalChats] = useState(0);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await chatService.getAllChatsAdmin(pageNumber);
      setFetchedChats(response.chats);
      setTotalPages(response.totalPages);
      setTotalChats(response.totalChats);
    };
    fetchChats();
  }, [pageNumber]);

  return { fetchedChats, totalPages, totalChats };
};

export default useGetAllChatsAdmin;
