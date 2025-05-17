import React from "react";

const InputField = ({
  label,
  type,
  name,
  placeholder,
  register,
  validationRules,
  error,
  clearErrors,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
        placeholder={placeholder}
        {...register(name, validationRules)}
        onFocus={() => clearErrors(name)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
