import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../../redux/CourseSlice/CourseSlice";
import CourseItem from "../CourseItem/CourseItem";
import Pagination from "@mui/material/Pagination";
import { setPage } from "../../redux/CourseSlice/CourseSlice";
import { userCourses } from "../../redux/AuthSlice/AuthSlice";
const CourseList = () => {
  const dispatch = useDispatch();
  const {
    courses,
    loading,
    error,
    levelFilter,
    categoryFilter,
    page,
    limit,
    totalPages,
  } = useSelector((state) => state.course);
  const base_url = import.meta.env.VITE_API_URL_BE;
  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };
  const userCoursesEnroll = useSelector((state) => state.auth.userCoursesEnroll);
  
  useEffect(() => {
    dispatch(fetchCourse({ page, limit }));
    dispatch(userCourses());
  }, [dispatch, page, levelFilter, categoryFilter]);

  const paidCourseIds = userCoursesEnroll?.courses?.map((c) => c.id) || [];
  const filteredCourses = courses
    .filter((course) => !paidCourseIds.includes(course.id))
    .filter((course) => {
      const matchCategory =
        !categoryFilter || categoryFilter === "All"
          ? true
          : String(course.categoryId) === String(categoryFilter) ||
            String(course.category?.id) === String(categoryFilter);

      const matchLevel =
        !levelFilter || levelFilter === "All"
          ? true
          : String(course.levelId) === String(levelFilter) ||
            String(course.level?.id) === String(levelFilter);

      return matchCategory && matchLevel;
    });

  if (loading)
    return <div className="text-center text-gray-500">Đang tải...</div>;
  if (error)
    return <div className="text-center text-red-500">Lỗi: {error}</div>;
  if (!filteredCourses.length)
    return <div className="text-center text-gray-500">Không có khóa học</div>;

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8 flex flex-wrap gap-6  justify-center items-center">
        {filteredCourses.map((course) => (
          <CourseItem key={course.id} course={course} base_url={base_url} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </div>
    </div>
  );
};

export default CourseList;
