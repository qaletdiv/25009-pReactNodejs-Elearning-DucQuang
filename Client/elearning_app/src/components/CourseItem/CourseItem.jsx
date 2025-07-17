import React from "react";
import { Link } from "react-router-dom";
import { addToCart, fetchCart } from "../../redux/Cart/CartSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function MediaCard({ course, base_url }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { users } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
  return (
    <>
      <div className="w-[300px] h-[400px] bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <img
          src={`${base_url}/${course.image}`}
          alt={course.title}
          className="w-full h-[160px] object-cover bg-gray-200 rounded-t-xl"
        />

        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 truncate mb-2">
              {course.title}
            </h2>
            <h3 className="text-lg font-semibold text-blue-600 mb-3">
              {course.price}$
            </h3>
            <p className="text-gray-700 text-sm line-clamp-2 mb-3">
              {course.description}
            </p>
            <div className="space-y-2">
              <p className="text-gray-700 text-sm flex items-center">
                Danh mục: {course.category.name}
              </p>
              <p className="text-gray-700 text-sm flex items-center">
                Cấp độ: {course.level.level}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 cursor-pointer"
              onClick={() => {
                handleAddToCart(course.id);
              }}
            >
              Add to cart
            </button>
            <Link
              to={`/courses/${course.id}`}
              className=" flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
