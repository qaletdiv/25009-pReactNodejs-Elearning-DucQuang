import React, { useEffect } from "react";
import UserCourseList from "../../components/UserCourseList/UserCourseList";
import { useSelector, useDispatch } from "react-redux";
import { userCourses } from "../../redux/AuthSlice/AuthSlice";
const UserCourse = () => {
  const { userCoursesEnroll, loading, error } = useSelector(
    (state) => state.auth
  );
  console.log("userCourse", userCoursesEnroll);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(userCourses());
    }
  }, [dispatch]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!userCoursesEnroll || userCoursesEnroll.length === 0) {
    return <div>Không có khóa học nào</div>;
  }

  return (
    <>
      <div>
        <div className="flex justify-around items-center text-5xl text-center font-mono bg-blue-800 h-20 text-white font-bold">Your Course</div>
        <UserCourseList userCourse={userCoursesEnroll}/>
      </div>
    </>
  );
};

export default UserCourse;
