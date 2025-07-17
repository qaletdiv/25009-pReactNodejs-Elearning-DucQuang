import React, { useEffect } from "react";
import UserCourseList from "../../components/UserCourseList/UserCourseList";
import { useSelector, useDispatch } from "react-redux";
import { userCourses } from "../../redux/AuthSlice/AuthSlice";
import Header from "../../components/Header/Header";
const UserCourse = () => {
  const { userCoursesEnroll, loading, error } = useSelector(
    (state) => state.auth
  );
  console.log("userCourse", userCoursesEnroll);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && (!userCoursesEnroll || userCoursesEnroll.length === 0)) {
      dispatch(userCourses());
    }
  }, [dispatch, userCoursesEnroll]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!userCoursesEnroll || userCoursesEnroll.length === 0) {
    return <div>Không có khóa học nào</div>;
  }

  return (
    <>
      <div>
        <Header />
        <div className="mt-5">
          <UserCourseList userCourse={userCoursesEnroll} />
        </div>
      </div>
    </>
  );
};

export default UserCourse;
