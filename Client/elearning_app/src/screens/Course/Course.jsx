import React from "react";
import CourseList from "../../components/CourseList/CourseList";
import Header from "../../components/Header/Header";
import FilterCategory from "../../components/FilterCategory/FilterCategory";
import FilterLevel from "../../components/FilterLevel/FilterLevel";
import SearchInput from "../../components/SearchInput/SearchInput";

const Course = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="container mx-auto px-6 py-10">

        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 mb-8">

          <div className="flex flex-row gap-6 mb-4">
            <div className="flex-1">
              <FilterCategory />
            </div>
            <div className="flex-1">
              <FilterLevel />
            </div>
          </div>

          <div className="flex">
            <div className="w-full">
              <SearchInput/>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
          <div className="flex">
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <CourseList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;