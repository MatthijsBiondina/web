import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import useGetAllChats from "../hooks/useChatService";

const OverviewContext = createContext();

export const OverviewProvider = ({ children }) => {
  const pageSize = 6;

  const [allChats, setAllChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);

  const [sortBy, setSortBy] = useState("created_at_newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  // Start with loading as true
  const [loading, setLoading] = useState(true);
  const { fetchedChats } = useGetAllChats();

  // This effect runs once on component mount to initialize allChats with fetched data
  // and applies the initial sort
  useEffect(() => {
    // Keep loading true until we have data
    if (fetchedChats.chats && fetchedChats.chats.length > 0) {
      // Apply the initial sort based on the default sortBy value
      const initialSortedChats = [...fetchedChats.chats];

      if (sortBy === "created_at_newest") {
        initialSortedChats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBy === "created_at_oldest") {
        initialSortedChats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortBy === "nr_of_reads_highest") {
        initialSortedChats.sort((a, b) => b.nrOfReads - a.nrOfReads);
      } else if (sortBy === "nr_of_reads_lowest") {
        initialSortedChats.sort((a, b) => a.nrOfReads - b.nrOfReads);
      }

      setAllChats(initialSortedChats);
      // Only set loading to false after we have successfully loaded and sorted the data
      setLoading(false);
    }
  }, [fetchedChats, sortBy]);

  // This effect handles re-sorting when sortBy changes (after the initial load)
  useEffect(() => {
    // Only sort if we have chats already loaded (prevents running on initial mount with empty array)
    if (allChats.length > 0) {
      // Set loading to true during re-sorting

      // Create a new sorted array instead of mutating the existing one
      let sortedChats = [...allChats]; // Create a copy of the array

      if (sortBy === "created_at_newest") {
        sortedChats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBy === "created_at_oldest") {
        sortedChats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortBy === "nr_of_reads_highest") {
        sortedChats.sort((a, b) => b.nrOfReads - a.nrOfReads);
      } else if (sortBy === "nr_of_reads_lowest") {
        sortedChats.sort((a, b) => a.nrOfReads - b.nrOfReads);
      }

      // Only update if the chats are actually different
      setAllChats(sortedChats);
    }
  }, [sortBy]); // Don't include allChats in dependencies to prevent infinite loop

  // This effect filters chats based on the search query
  useEffect(() => {
    console.log("searchQuery", searchQuery);

    if (searchQuery === "") {
      setFilteredChats(allChats);
    } else {
      setFilteredChats(
        allChats.filter((chat) => chat.subject.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  }, [searchQuery, allChats]);

  useEffect(() => {
    // Set page number to 1
    setPageNumber(1);

    // Set number of pages to the length of the filtered chats divided by the page size
    setNumberOfPages(Math.ceil((filteredChats.length + 1) / pageSize));

    console.log("numberOfPages", numberOfPages);
  }, [filteredChats]);

  return (
    <OverviewContext.Provider
      value={{
        allChats,
        sortBy,
        setSortBy,
        loading,
        searchQuery,
        setSearchQuery,
        filteredChats,
        pageNumber,
        setPageNumber,
        pageSize,
        numberOfPages,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};

OverviewProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useOverview = () => useContext(OverviewContext);
