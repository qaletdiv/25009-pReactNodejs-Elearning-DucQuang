import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const SearchInput = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <SearchIcon />
      </div>
      <input
        className="bg-white rounded-full w-full p-2 pl-10 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 font-mono"
        type="text"
        placeholder="Learn something..."
      />
    </div>
  );
};

export default SearchInput;
