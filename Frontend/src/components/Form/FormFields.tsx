import { forwardRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  register?: ReturnType<UseFormRegister<any>>;
  showPasswordToggle?: boolean;
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
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative space-y-2">
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
        <div className="relative">
          <input
            type={
              showPasswordToggle ? (showPassword ? "text" : "password") : type
            }
            id={name}
            placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
            className={`mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm transition focus:outline-none focus:ring-2 ${
              errorMessage
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-light focus:ring-primary-light"
            }`}
            {...register}
          />
          {showPasswordToggle && (
            <div
              className="absolute inset-y-0 right-4 flex cursor-pointer items-center"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IoEyeOff className="size-6 text-gray-500" />
              ) : (
                <IoEye className="size-6 text-gray-500" />
              )}
            </div>
          )}
        </div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  },
);

FormField.displayName = "FormField";
