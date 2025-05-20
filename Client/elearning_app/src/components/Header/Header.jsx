import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchInput from "../searchInput/SearchInput";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
const Header = () => {
  const {users} = useSelector(state => state.auth)
  console.log("users:",users);
  return (
    <div className="bg-blue-900 bg-opacity-50 h-18 w-full sticky top-0 flex justify-between items-center px-8 z-50">
      <div className="flex gap-4">
        <span className="text-white font-bold text-3xl font-mono">Elearning</span>
      </div>

      <div className="font-bold flex gap-6">
        <span className="text-white font-mono text-xl">Home</span>
        <span className="text-white font-mono text-xl">Course</span>
        <span className="text-white font-mono text-xl">About</span>
        <span className="text-white font-mono text-xl">Contact Us</span>
      </div>

      <div className="gap-4">
        <SearchInput />
      </div>

      <div className="flex gap-4 items-center relative z-50">
        <div className="relative group">
          <span>Xin chào {users?.email}</span>
          <AccountCircleIcon className="text-white cursor-pointer" />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
            <ul className="py-2 text-gray-700">
              <li>
                <a href="/register" className="block px-4 py-2 hover:bg-gray-100">
                  Đăng ký
                </a>
              </li>
              <li>
                <a href="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Đăng nhập
                </a>
              </li>
              <li>
                <a href="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Giỏ hàng
                </a>
              </li>
              <li>
                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  Hồ sơ
                </a>
              </li>
              <li>
                <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
