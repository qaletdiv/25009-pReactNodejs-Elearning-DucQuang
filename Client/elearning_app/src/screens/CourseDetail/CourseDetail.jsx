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
  console.log(course);
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

  console.log(course);
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img src={`${base_url}/${course.image}`} alt={course.title} />
          </div>

          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4 font-mono">
                {course.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mt-4 font-mono">
                {course.description}
              </p>
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-mono my-2">Các chương học</h1>
              <div className="border rounded">
                {course.sections.map((section) => (
                  <div key={section.id} className="p-4 border-b">
                    <h3 className="text-lg font-semibold">
                      {section.sectionName}
                    </h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-mono mb-4">Đánh Giá & Bình Luận</h1>
              {course.reviews.map((review) => (
                <div key={review.id} className="p-4 border-b">
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={
                          index < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({review.rating} sao)
                    </span>
                  </div>
                  <p className="text-gray-600">{review.user.username}</p>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
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
