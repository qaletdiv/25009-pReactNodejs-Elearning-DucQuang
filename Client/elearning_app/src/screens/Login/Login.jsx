import React from "react";
import InputField from "../../components/InputField/InputField";
import ButtonSubmit from "../../components/buttonSubmit/ButtonSubmit";
import { useForm } from "react-hook-form";
import { useDispatch} from "react-redux";
import { loginUser } from "../../redux/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onHandleSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (error) {
       setError("password", { type: "server", message: error });
    }
  };
  const gotoRegister = () => {
    navigate("/register");
  };
  const gotoForgotPassword = () => {
    navigate("/forgot-password");
  };
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-3/4 bg-white relative">
        <img
          className="w-full h-full object-cover opacity-80"
          src="https://www.riseatnorthgate.com/wp-content/uploads/2020/03/studying.jpg"
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
            Login
          </h2>
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
          <ButtonSubmit type="submit">
            Submit
          </ButtonSubmit>
          <p className="text-center text-gray-600 mt-4">
            Bạn chưa có tài khoản?
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={gotoRegister}
            >
              Đăng ký
            </span>
          </p>
          <p className="text-center text-gray-600 mt-4">
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={gotoForgotPassword}
            >
              Quên mật khẩu?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
