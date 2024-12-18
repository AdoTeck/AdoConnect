import { IoEye, IoEyeOff } from "react-icons/io5";

export function FormField({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2 animate-in">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#229ABD] focus:border-[#229ABD] transition"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export function PasswordField({
  label,
  name,
  value,
  showPassword,
  onChange,
  toggleVisibility,
}: {
  label: string;
  name: string;
  value: string;
  showPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleVisibility: () => void;
}) {
  return (
    <div className="space-y-2 relative animate-in">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#229ABD] focus:border-[#229ABD] transition"
          placeholder={`Enter your ${label.toLowerCase()}`}
          required
        />
        <div
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
          onClick={toggleVisibility}
        >
          {showPassword ? (
            <IoEyeOff className="w-6 h-6 text-gray-500" />
          ) : (
            <IoEye className="w-6 h-6 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
}
