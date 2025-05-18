import React from "react";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ButtonSubmit from "../../components/buttonSubmit/ButtonSubmit";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onHandleSubmit = async (data) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      toast.success(
        "Yêu cầu thay đổi mật khẩu đã được gửi, vui lòng kiểm tra email",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error) {
      if (typeof error === "string" && error.includes("Email không tồn tại")) {
        setError("email", {
          type: "server",
          message: "Email không tồn tại, vui lòng kiểm tra lại",
        });
      } else {
        toast.error(
          "Không có kết nối mạng, vui lòng kiểm tra lại kết nối của bạn!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    }
  };
  const backToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="h-full bg-linear-to-r from-cyan-500 to-blue-500">
      <div className="w-full h-screen flex items-center justify-center">
        <form
          className="w-1/4 space-y-4 p-6 bg-white rounded-2xl shadow-lg"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Forgot Password?
          </h2>
          <InputField
            label="Xác nhận email"
            type="email"
            name="email"
            placeholder="Nhập email"
            register={register}
            validationRules={{
              required: "Email không được để trống",
              validate: {
                noWhitespace: (value) =>
                  value.trim() !== "" ||
                  "Email không được chứa toàn khoảng trắng",
                noSpacesInside: (value) =>
                  !/\s/.test(value) || "Email không được chứa khoảng trắng",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            }}
            error={errors.email}
          />
          <ButtonSubmit type="submit">Send</ButtonSubmit>
          <p className="text-center text-gray-600 mt-4">
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={backToLogin}
            >
              Back
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
