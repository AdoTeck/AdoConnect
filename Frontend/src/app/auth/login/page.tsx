// "use client";

// import { useState } from "react";
// import { useGSAPAnimation } from "../../hooks/useGSAPAnimation.ts";
// import { FaVideo, FaProjectDiagram, FaCode } from "react-icons/fa";
// import { FeatureItem } from "../../components/Icons/FeatureItem.tsx";
// import { FormField, PasswordField } from "../../components/Form/FormFields";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const containerRef = useGSAPAnimation();

//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Login attempt with:", email, password);
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-r from-indigo-100 to-teal-100 flex items-center justify-center px-4 overflow-hidden">
//       <div
//         className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex relative"
//         ref={containerRef}
//       >
//         {/* Left Section */}
//         <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#229ABD] to-[#126D8F] p-10 items-center justify-center">
//           <div className="space-y-6 text-center animate-in">
//             <h2 className="text-4xl font-extrabold text-white leading-snug">
//               Student <br /> Solutions Hub
//             </h2>
//             <FeatureItem icon={FaVideo} text="Video Tutorials & Reels" />
//             <FeatureItem icon={FaProjectDiagram} text="Project Assistance" />
//             <FeatureItem icon={FaCode} text="Developer Guidance" />
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="w-full md:w-1/2 p-10 bg-gray-50">
//           <h2 className="text-3xl font-extrabold text-[#020344] text-center mb-8 animate-in">
//             Login
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div className="space-y-4">
//               <div className="animate-in">
//                 <FormField
//                   label="Email Address"
//                   type="email"
//                   name="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div className="animate-in">
//                 <PasswordField
//                   label="Password"
//                   name="password"
//                   value={password}
//                   showPassword={showPassword}
//                   onChange={(e) => setPassword(e.target.value)}
//                   toggleVisibility={togglePasswordVisibility}
//                 />
//               </div>
//             </div>

//             <div className="animate-in">
//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 text-white bg-[#229ABD] rounded-lg font-semibold text-lg shadow-lg hover:bg-[#126D8F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#229ABD] transition-transform duration-200 hover:scale-105"
//               >
//                 Sign In
//               </button>
//             </div>
//           </form>
//           <p className="mt-6 text-center text-sm text-gray-600 animate-in">
//             Don't have an account?{" "}
//             <a
//               href="/auth/signup"
//               className="font-medium text-[#229ABD] hover:text-[#126D8F] transition-colors"
//             >
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
