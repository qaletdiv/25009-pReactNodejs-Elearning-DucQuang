import React from "react";

const ButtonSubmit = ({ type = "button", isLoading, disabled, children, ...props }) => {
  return (
    <button
      type={type}
      className={`w-full p-3 rounded-lg transition duration-200 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default ButtonSubmit;