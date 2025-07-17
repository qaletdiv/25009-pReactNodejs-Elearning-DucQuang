import React from "react";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckOutForm"
import "./Checkout.css";

const stripePromise = loadStripe("pk_test_51RNvdrB4vEw8CxGaV1er61SLB8DRuv8Zasrf3FtqadfPYKChfRQQ3o5qmdnFQzZ5AKxWIA2Ycee4mQo03VijOYRl00Jz8HbFr1"); // Thay bằng public key của bạn

const CheckOut = () => {
  const { cart } = useSelector((state) => state.cart);

  // const total = cart.items?.reduce(
  //   (sum, item) => sum + (item.course?.price || 0),
  //   0
  // );
  // const base_url = import.meta.env.VITE_API_URL_BE;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Thanh Toán
        </h1> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Chi Tiết Đơn Hàng
            </h2>
            {cart.items && cart.items.length > 0 ? (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-4 border-b pb-4"
                >
                  <img
                    src={`${base_url}/${item.course?.image}`}
                    alt={item.course?.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.course?.title}
                    </p>
                    <p className="text-gray-600">
                      {item.course?.price
                        ? `${item.course.price.toLocaleString()}₫`
                        : ""}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {item.course?.price
                      ? `${item.course.price.toLocaleString()}₫`
                      : ""}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                Không có sản phẩm nào trong đơn hàng.
              </p>
            )}
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold text-gray-700">Tổng cộng</p>
              <p className="text-lg font-bold text-blue-600">
                {total ? `${total.toLocaleString()}₫` : "0₫"}
              </p>
            </div>
          </div>
        </div> */}
        <div className="mt-8">
          <Elements stripe={stripePromise}>
            <CheckoutForm items={cart.items} />
          </Elements>
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          Thanh toán an toàn với các cổng thanh toán uy tín
        </p>
      </div>
    </>
  );
};

export default CheckOut;