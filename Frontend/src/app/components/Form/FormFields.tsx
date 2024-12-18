import { forwardRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  register?: any; // Accepting React Hook Form's `register` function
  showPasswordToggle?: boolean; // Enable visibility toggle for password fields
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      type = "text",
      name,
      placeholder,
      errorMessage,
      register,
      showPasswordToggle = false,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-2 relative">
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
        <div className="relative">
          <input
            type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
            id={name}
            placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
            className={`mt-1 block w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 transition ${
              errorMessage
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-[#229ABD] focus:border-[#229ABD]"
            }`}
            {...register} // Apply React Hook Form's register
          />
          {showPasswordToggle && (
            <div
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IoEyeOff className="w-6 h-6 text-gray-500" />
              ) : (
                <IoEye className="w-6 h-6 text-gray-500" />
              )}
            </div>
          )}
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
