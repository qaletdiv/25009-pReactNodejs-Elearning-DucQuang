import React from "react";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import TechSection from "../../components/techSection/techSection";
import IntroduceSection from "../../components/IntroduceSection/IntroduceSection";
import UserCourseList from "../../components/UserCourseList/UserCourseList"
// import { useSelector, useDispatch } from "react-redux";
// import { userCourses } from "../../redux/AuthSlice/AuthSlice";
// import { useEffect } from "react";
const Home = () => {
  // const { userCoursesEnroll, loading, error } = useSelector(
  //   (state) => state.auth
  // );
  // console.log("userCourse", userCoursesEnroll);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && (!userCoursesEnroll || userCoursesEnroll.length === 0)) {
  //     dispatch(userCourses());
  //   }
  // }, [dispatch, userCoursesEnroll]);

  // if (loading) return <div>Đang tải...</div>;
  // if (error) return <div>Lỗi: {error}</div>;
  // if (!userCoursesEnroll || userCoursesEnroll.length === 0) {
  //   return <div>Không có khóa học nào</div>;
  // }

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Header />
        </div>
        <div>
          <Slider />
        </div>
        {/* <div>
          <TechSection />
        </div> */}
        <div>
          <IntroduceSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
