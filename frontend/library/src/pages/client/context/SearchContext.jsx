import { createContext, useState, useContext } from "react";

// Tạo context
const SearchContext = createContext();

// Provider để wrap toàn app
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook để dùng context
export const useSearch = () => useContext(SearchContext);