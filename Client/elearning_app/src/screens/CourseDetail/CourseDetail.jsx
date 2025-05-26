import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../../redux/CourseSlice/CourseSlice";
import Header from "../../components/Header/Header";
import RatingStar from "../../components/Rating/RatingStar";

const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const base_url = import.meta.env.VITE_API_URL_BE;
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  if (!course || Object.keys(course).length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        Đang tải dữ liệu...
      </div>
    );
  }

 return (
  <div>
    <Header />
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1">
          <img
            src={`${base_url}/${course.image}`}
            alt={course.title}
          />
        </div>

        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
            <RatingStar />
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              {course.description}
            </p>
          </div>

          <div className="mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
              Tham gia khóa học
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
);

};

export default CourseDetail;
