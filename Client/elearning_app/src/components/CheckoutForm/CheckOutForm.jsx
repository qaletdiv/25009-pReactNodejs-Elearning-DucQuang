import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearCartAsync } from "../../redux/Cart/CartSlice";
import { clearCart } from "../../redux/Cart/CartSlice";

const CheckoutForm = ({ shipping = 0, discount = 0 }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { accessToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.cart.items);

  useEffect(() => {
    if (!items || !Array.isArray(items) || items.length === 0 || !accessToken)
      return;

    const testCreatePaymentIntent = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/orders/createPaymentIntent",
          { items, shipping, discount },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        toast.error(error.response?.data?.message || "Lỗi tạo PaymentIntent");
        console.error("API create-payment-intent error:", error);
      }
    };
    testCreatePaymentIntent();
  }, [items, shipping, discount, accessToken]);

  const total = items.reduce((sum, item) => sum + (item.course?.price || 0), 0);
  const finalTotal = total + shipping - discount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error("Stripe chưa sẵn sàng");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: user?.name,
          email: user?.email
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      toast.success("Thanh toán thành công!");
      try {
        await axios.post(
          "http://localhost:5000/api/v1/orders",
          {
            items: items.map((item) => ({
              courseId: item.course.id,
              course: item.course,
            })),
            totalPrice: finalTotal,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success("Tạo đơn hàng thành công!");
      } catch (orderError) {
        toast.error(orderError.response?.data?.message || "Lỗi tạo đơn hàng");
      }
      await dispatch(clearCartAsync());
      dispatch(clearCart());
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Thanh Toán Đơn Hàng
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Chi tiết đơn hàng
        </h3>
        <div className="divide-y divide-gray-200 border rounded-lg">
          {items.length === 0 ? (
            <div className="p-4 text-gray-500 text-center">
              Không có sản phẩm nào trong đơn hàng.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      item.course?.image
                        ? `${import.meta.env.VITE_API_URL_BE}/${
                            item.course.image
                          }`
                        : ""
                    }
                    alt={item.course?.title}
                    className="w-14 h-14 object-cover rounded shadow"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {item.course?.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.course?.description?.slice(0, 50)}...
                    </div>
                  </div>
                </div>
                <div className="font-bold text-blue-600">
                  {item.course?.price?.toLocaleString()}₫
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between mt-4 text-gray-700">
          <span>Tạm tính:</span>
          <span>{total.toLocaleString()}₫</span>
        </div>
        {shipping > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Phí vận chuyển:</span>
            <span>{shipping.toLocaleString()}₫</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Giảm giá:</span>
            <span>-{discount.toLocaleString()}₫</span>
          </div>
        )}
        <div className="flex justify-between mt-2 text-lg font-bold text-blue-700 border-t pt-2">
          <span>Tổng cộng:</span>
          <span>{finalTotal.toLocaleString()}₫</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-3 border rounded" />
        <button
          type="submit"
          disabled={!stripe || loading || !clientSecret}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-200"
        >
          {loading ? "Đang xử lý..." : "Thanh toán"}
        </button>
      </form>
      <div className="text-center text-xs text-gray-400 mt-4">
        Thanh toán an toàn với Stripe. Thông tin của bạn được bảo mật.
      </div>
    </div>
  );
};

export default CheckoutForm;
