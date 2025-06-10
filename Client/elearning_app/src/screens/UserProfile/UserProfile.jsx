import React, { useState, useEffect } from "react";
import { FaUser, FaEdit } from "react-icons/fa";
import Header from "../../components/Header/Header";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfile,
  fetchUserProfile,
  changePassword,
} from "../../redux/AuthSlice/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const base_url = import.meta.env.VITE_API_URL_BE;
  const [activeTab, setActiveTab] = useState("profile");
  const password = watch("password")
  const tabs = [
    { id: "profile", name: "Hồ sơ", icon: <FaUser /> },
    { id: "edit", name: "Chỉnh sửa", icon: <FaEdit /> },
    { id: "editPassword", name: "Thay Đổi Mật Khẩu", icon: <FaEdit /> },
  ];
  const onSubmit = async (data) => {
    const userImage =
      data.avatar && data.avatar.length > 0 ? data.avatar[0] : null;
    try {
      await dispatch(
        editUserProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          dateOfBirth: data.dateOfBirth,
          userImage: userImage,
        })
      ).unwrap();
      await dispatch(fetchUserProfile());
      toast.success("Cập nhật hồ sơ thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      reset();
    } catch (error) {
      toast.error(error || "Cập nhật thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const onChangePassword = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!", { position: "top-right" });
      return;
    }
    try {
      await dispatch(changePassword({ newPassword: data.password })).unwrap();
      toast.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error || "Đổi mật khẩu thất bại!", { position: "top-right" });
    }
  };

  return (
    <>
      <Header />
      <div className="w-full max-w-3xl mx-auto p-6">
        <div className="flex justify-start gap-6 border-b border-gray-300 pb-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 
              ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md">
          {activeTab === "edit" && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Cập nhật thông tin
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                  label="Tên"
                  type="text"
                  name="firstName"
                  placeholder="Nhập tên"
                  register={register}
                  // validationRules={{
                  //   validate: {
                  //     noWhitespace: (v) =>
                  //       v.trim() !== "" || "Không được toàn khoảng trắng",
                  //     noSpacesInside: (v) =>
                  //       !/\s/.test(v) || "Không được chứa khoảng trắng",
                  //   },
                  // }}
                  error={errors.firstName}
                />

                <InputField
                  label="Họ"
                  type="text"
                  name="lastName"
                  placeholder="Nhập họ"
                  register={register}
                  // validationRules={{
                  //   validate: {
                  //     noWhitespace: (v) =>
                  //       v.trim() !== "" || "Không được toàn khoảng trắng",
                  //     noSpacesInside: (v) =>
                  //       !/\s/.test(v) || "Không được chứa khoảng trắng",
                  //   },
                  // }}
                  error={errors.lastName}
                />

                <InputField
                  label="Số điện thoại"
                  type="text"
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại"
                  register={register}
                  // validationRules={{
                  //   validate: {
                  //     noWhitespace: (v) =>
                  //       v.trim() !== "" || "Không được toàn khoảng trắng",
                  //     noSpacesInside: (v) =>
                  //       !/\s/.test(v) || "Không được chứa khoảng trắng",
                  //   },
                  // }}
                  error={errors.phoneNumber}
                />

                <InputField
                  label="Ngày sinh"
                  type="date"
                  name="dateOfBirth"
                  register={register}
                  error={errors.dateOfBirth}
                />

                <InputField
                  label="Ảnh đại diện"
                  type="file"
                  name="avatar"
                  register={register}
                  error={errors.avatar}
                />

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Cập nhật
                </button>
              </form>
            </>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">
                Thông tin cá nhân
              </h2>
              {userProfile ? (
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  {userProfile.profile.userImage ? (
                    <img
                      src={`${base_url}/${userProfile.profile.userImage}`}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500 shadow-md">
                      <FaUser />
                    </div>
                  )}
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-500">
                        Họ tên:{" "}
                      </span>
                      {userProfile.profile.firstName}{" "}
                      {userProfile.profile.lastName}
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">SĐT: </span>
                      {userProfile.profile.phoneNumber}
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">
                        Ngày sinh:{" "}
                      </span>
                      {userProfile.profile.dateOfBirth
                        ? new Date(
                            userProfile.profile.dateOfBirth
                          ).toLocaleDateString("vi-VN")
                        : "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Không có thông tin người dùng.
                </p>
              )}
            </div>
          )}

          {activeTab === "editPassword" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">
                Thay đổi mật khẩu
              </h2>
              <form
                onSubmit={handleSubmit(onChangePassword)}
                className="space-y-4"
              >
                <InputField
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  register={register}
                  validationRules={{
                    required: "Vui lòng nhập mật khẩu",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu tối thiểu 6 ký tự",
                    },
                  }}
                  error={errors.password}
                />
                <InputField
                  label="Xác nhận mật khẩu"
                  type="password"
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  register={register}
                  validationRules={{
                    required: "Vui lòng xác nhận mật khẩu",
                    validate: (value) =>
                      value === password || "Mật khẩu xác nhận không khớp",
                  }}
                  error={errors.confirmPassword}
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Cập nhật
                </button>
              </form>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default UserProfile;
