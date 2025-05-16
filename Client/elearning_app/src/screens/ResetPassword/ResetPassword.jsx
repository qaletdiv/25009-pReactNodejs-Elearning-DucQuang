import React from "react";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ButtonSubmit from "../../components/buttonSubmit/ButtonSubmit";
import { useSelector, useDispatch} from "react-redux";
import { resetPassword } from "../../redux/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const {loading} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const password = watch("password"); 
  const navigate = useNavigate();
  const onHandleSubmit = (data) => {
    try {
      delete data.confirmedPassword;
      dispatch(resetPassword(data)); 
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-full bg-linear-to-r from-cyan-500 to-blue-500">
      <div className="w-full h-screen flex items-center justify-center">
        <form className="w-1/4 space-y-4 p-6 bg-white rounded-2xl shadow-lg" onSubmit={handleSubmit(onHandleSubmit)}>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </h2>
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
          <ButtonSubmit type="submit" isLoading={loading}>Send</ButtonSubmit>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
