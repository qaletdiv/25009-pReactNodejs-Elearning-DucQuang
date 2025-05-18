import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/AuthSlice/AuthSlice";
import InputField from "../../components/InputField/InputField";
import ButtonSubmit from "../../components/buttonSubmit/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm();
  const dispatch = useDispatch();
  const password = watch("password");
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  const onHandleSubmit = async (data) => {
    try {
      delete data.confirmedPassword;
      await dispatch(registerUser(data)).unwrap();
      toast.success(
        "Đăng ký thành công! Bạn sẽ được chuyển tới trang đăng nhập.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (typeof error === "string" && error.includes("Email đã tồn tại")) {
        setError("email", {
          type: "server",
          message: "Email đã tồn tại, vui lòng sử dụng email khác",
        });
      } else {
        toast.error("Không có kết nối mạng, vui lòng kiểm tra lại kết nối của bạn!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-3/4 bg-white relative">
        <img
          className="w-full h-full object-cover opacity-80"
          src="https://res.cloudinary.com/highereducation/image/upload/v1533591754/TheBestColleges.org/study-notebooks.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="w-2/4 h-screen flex items-center justify-center">
        <form
          className="w-3/4 space-y-4 p-6 bg-white rounded-2xl shadow-lg"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <InputField
            label="Username"
            type="text"
            name="username"
            placeholder="Nhập username"
            register={register}
            validationRules={{
              required: "Username không được để trống",
              validate: {
                noWhitespace: (value) =>
                  value.trim() !== "" ||
                  "Username không được chứa toàn khoảng trắng",
                noSpacesInside: (value) =>
                  !/\s/.test(value) || "Username không được chứa khoảng trắng",
              },
              minLength: {
                value: 6,
                message: "Username phải có ít nhất 6 ký tự",
              },
            }}
            error={errors.username}
          />
          <InputField
            label="Email"
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
          <InputField
            label="Mật khẩu"
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
          <ButtonSubmit type="submit">Submit</ButtonSubmit>
          <p className="text-center text-gray-600 mt-4">
            Bạn đã có tài khoản?
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={goToLogin}
            >
              Đăng nhập
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
