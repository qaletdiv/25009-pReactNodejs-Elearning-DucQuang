import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../../redux/CourseSlice/CourseSlice";
import CourseItem from "../CourseItem/CourseItem";

const CourseList = () => {
  const { courses } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const base_url = import.meta.env.VITE_API_URL_BE;
  useEffect(() => {
    dispatch(fetchCourse());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center mt-6 text-3xl font-mono text-blue-900 ">
        Courses
      </h1>

      <div className="flex flex-wrap justify-around gap-6 mt-8">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} base_url={base_url} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
