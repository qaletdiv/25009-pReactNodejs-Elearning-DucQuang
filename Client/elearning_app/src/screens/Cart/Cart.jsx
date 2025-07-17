import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import { fetchCart, removeCartItem } from "../../redux/Cart/CartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const handlePayment = () => {
    setLoading(true);
    navigate("/checkout");
    setLoading(false);
  };

  const base_url = import.meta.env.VITE_API_URL_BE;
  const total =
    cart && cart.items
      ? cart.items.reduce((sum, item) => sum + (item.course?.price || 0), 0)
      : 0;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Giỏ hàng của bạn
        </h1>
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {cart && cart.items && cart.items.length > 0 ? (
            <div>
              <ul>
                {cart.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between border-b last:border-b-0 px-6 py-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`${base_url}/${item?.course?.image}`}
                        alt={item?.course?.title}
                        className="w-16 h-16 object-cover rounded-lg shadow"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {item.course?.title || item.courseId}
                        </div>
                        <div className="text-gray-500 text-sm max-w-xs truncate">
                          {item.course?.description || ""}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-blue-600 font-bold">
                        {item.course?.price
                          ? `${item.course.price.toLocaleString()}₫`
                          : ""}
                      </span>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
                <span className="font-semibold text-lg text-gray-700">
                  Tổng cộng:
                </span>
                <span className="font-bold text-xl text-blue-700">
                  {total.toLocaleString()}₫
                </span>
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className={`w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Đang xử lý..." : "Thanh Toán với Stripe"}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-gray-500 text-lg flex flex-col items-center gap-4">
              <span>Giỏ hàng trống</span>
              <Link
                to="/courses"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                Khám phá khóa học
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
