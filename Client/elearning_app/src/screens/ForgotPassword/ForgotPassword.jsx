import React from "react";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ButtonSubmit from "../../components/buttonSubmit/ButtonSubmit";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
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
    } catch (error) {
      setError("email", { type: "server", message: error });
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
          <ButtonSubmit type="submit">
            Send
          </ButtonSubmit>
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
    </div>
  );
};

export default ForgotPassword;
