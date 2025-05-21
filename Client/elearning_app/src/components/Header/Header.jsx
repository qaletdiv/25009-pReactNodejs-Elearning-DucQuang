import React, { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchInput from "../searchInput/SearchInput";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../../redux/AuthSlice/AuthSlice";
import { Link } from "react-router-dom";
import { logout } from "../../redux/AuthSlice/AuthSlice";
const Header = () => {
  const { users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-blue-900 bg-opacity-50 h-18 w-full sticky top-0 flex justify-between items-center px-8 z-50">
      <div className="flex gap-4">
        <span className="text-white font-bold text-3xl font-mono">
          Elearning
        </span>
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
          {users?.username && (
            <span className="text-white font-mono font-bold">
              Welcome, {users.username}
            </span>
          )}{" "}
          <AccountCircleIcon className="text-white cursor-pointer" />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
            <ul className="py-2 text-gray-700">
              {!users ? (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/cart"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <a
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      User Profile
                    </a>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={logOut}
                    >
                      LogOut
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
