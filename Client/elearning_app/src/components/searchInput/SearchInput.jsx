import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { searchCourses, fetchCourse } from "../../redux/CourseSlice/CourseSlice";

const SearchInput = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); 
   if (!title.trim()) {
    dispatch(fetchCourse()); 
  } else {
    dispatch(searchCourses(title.trim())); 
  }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl mx-auto space-x-2"
    >
      <div className="relative flex-grow">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </div>
        <input
          className="bg-white rounded-full w-full p-2 pl-10 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 font-mono h-10"
          type="text"
          placeholder="Learn something..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 h-10"
      >
        Find
      </button>
    </form>
  );
};

export default SearchInput;