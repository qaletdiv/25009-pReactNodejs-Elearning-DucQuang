import React from "react";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ButtonSubmit from "../../components/buttonSubmit/ButtonSubmit";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../redux/AuthSlice/AuthSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const password = watch("password");
  const navigate = useNavigate();
  if (!token) {
    return (
      <div>Error: No token found in URL. Please check the reset link.</div>
    );
  }
  const onHandleSubmit = async (data) => {
    try {
      delete data.confirmedPassword;
      const payload = { newPassword: data.password, token };
      await dispatch(resetPassword(payload)).unwrap();
      toast.success("Thay đổi mât khẩu thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (
        error?.name === "TypeError" ||
        (typeof error === "string" && error.includes("Network Error")) ||
        !navigator.onLine
      ) {
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
      } else {
        toast.error(
          typeof error === "string"
            ? error
            : error?.message || "Đã xảy ra lỗi, vui lòng thử lại sau!",
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
      return;
    }
  };
  return (
    <div className="h-full bg-linear-to-r from-cyan-500 to-blue-500">
      <div className="w-full h-screen flex items-center justify-center">
        <form
          className="w-1/4 space-y-4 p-6 bg-white rounded-2xl shadow-lg"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </h2>
          <InputField
            label="Mật khẩu mới"
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            register={register}
            validationRules={{
              required: "Password không được để trống",
              validate: {
                noWhitespace: (value) =>
                  value.trim() !== "" ||
                  "Password không được chứa toàn khoảng trắng",
                noSpacesInside: (value) =>
                  !/\s/.test(value) || "Password không được chứa khoảng trắng",
              },
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ in hoa và 1 số",
              },
            }}
            error={errors.password}
          />
          <InputField
            label="Xác nhận mật khẩu"
            type="password"
            name="confirmedPassword"
            placeholder="Xác nhận mật khẩu"
            register={register}
            validationRules={{
              required: "Vui lòng xác nhận mật khẩu",
              validate: (value) =>
                value === password || "Mật khẩu xác nhận không khớp",
            }}
            error={errors.confirmedPassword}
          />
          <ButtonSubmit type="submit" isLoading={loading}>
            Send
          </ButtonSubmit>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;
