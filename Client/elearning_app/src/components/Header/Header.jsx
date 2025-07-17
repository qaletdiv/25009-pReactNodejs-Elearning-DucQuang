import React, { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchInput from "../SearchInput/SearchInput";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../../redux/AuthSlice/AuthSlice";
import { Link } from "react-router-dom";
import { logout } from "../../redux/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../redux/Cart/CartSlice";
const Header = () => {
  const { users } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !users?.username) {
      dispatch(getMe());
    }
  }, [dispatch, users?.username]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const logOut = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <div className="bg-blue-900 bg-opacity-50 h-[72px] w-full flex justify-between items-center px-8 z-50 ">
        <div>
          <span className="text-white font-bold text-3xl font-mono">
            Elearning
          </span>
        </div>

        <div className="font-bold flex gap-6">
          <Link to="/">
            <span className="text-white font-mono text-xl">Home</span>
          </Link>
          <Link to="/courses">
            <span className="text-white font-mono text-xl">Course</span>
          </Link>
          <Link to="/">
            <span className="text-white font-mono text-xl">About</span>
          </Link>
          <Link to="/">
            <span className="text-white font-mono text-xl">Contact</span>
          </Link>
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
                        to="/cart"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Cart{" "}
                        <span className="ml-2 bg-blue-950 text-white text-xs font-semibold rounded-full px-2 py-1">
                          {cart?.items?.length || 0}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        User Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user-course-enroll"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        User Courses
                      </Link>
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
    </div>
  );
};

export default Header;
