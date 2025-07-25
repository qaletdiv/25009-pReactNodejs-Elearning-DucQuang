import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../../redux/CourseSlice/CourseSlice";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { addToCart, fetchCart } from "../../redux/Cart/CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const base_url = import.meta.env.VITE_API_URL_BE;
  const { course } = useSelector((state) => state.course);
  const { userCoursesEnroll } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  if (!course || Object.keys(course).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        Đang tải dữ liệu...
      </div>
    );
  }
  const handleAddToCart = async (data) => {
    if (!users) {
      toast.warning("Bạn cần đăng nhập để thêm vào giỏ hàng!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }
    const isInCart = cart?.items?.some((item) => item.courseId === data);
    if (isInCart) {
      toast.warning("Sản phẩm đã có trong giỏ hàng!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      try {
        await dispatch(addToCart(data)).unwrap();
        dispatch(fetchCart());
        toast.success("Thêm giỏ hàng thành công", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error(error || "Có lỗi xảy ra!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };
  const isEnrolled = userCoursesEnroll?.courses?.some(
    (enrolledCourse) => enrolledCourse.id === course.id
  );

  const averageRating =
    course.reviews.length > 0
      ? (
          course.reviews.reduce((sum, review) => sum + review.rating, 0) /
          course.reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="w-full h-full">
            <img
              src={`${base_url}/${course.image}`}
              alt={course.title}
              className="w-full max-h-[800px] rounded-lg shadow-md"
            />
          </div>

          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 font-mono">
                {course.title}
              </h1>

              <p className="text-gray-700 text-lg leading-relaxed font-sans mb-6">
                {course.description}
              </p>

              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 font-mono">
                  Chương trình học
                </h2>
                <div className="divide-y">
                  {course.sections.map((section) => (
                    <div key={section.id} className="py-3">
                      <h3 className="text-lg font-bold text-blue-700">
                        {section.sectionName}
                      </h3>
                      <p className="text-gray-600">{section.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 font-mono">
                  Đánh giá & Bình luận ({averageRating} ★)
                </h2>
                {course.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="mb-4 border-b pb-3 last:border-b-0"
                  >
                    <div className="flex items-center mb-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className={`text-xl ${
                            index < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        ({review.rating} sao)
                      </span>
                    </div>
                    <p className="text-gray-800 font-semibold">
                      {review.user.username}
                    </p>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              {isEnrolled ? (
                <Link
                  to="/user-course-enroll"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
                >
                  Tiếp tục học
                </Link>
              ) : (
                <button
                  onClick={() => handleAddToCart(course.id)}
                  className="w-48 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
                >
                  Thêm vào giỏ hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
