import { useState, useEffect } from "react";
import { chatService } from "services/chatService";

const useGetAllChats = () => {
  const [fetchedChats, setFetchedChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await chatService.getAllChats();
      setFetchedChats(chats);
    };
    fetchChats();
  }, []);

  return { fetchedChats };
};

export default useGetAllChats;
