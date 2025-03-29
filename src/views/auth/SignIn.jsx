// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import InputField from "components/fields/InputField";
// import axios from "axios";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log("I'm called", email, password)
//     setLoading(true);
//     setError("");

//     if (!email.trim() || !password.trim()) {
//       setError("Email and Password are required");
//       setLoading(false);
//       return;
//     }
//     console.log("Email and Password", email, password);

//     try {

//       const formdata = new FormData();
//       formdata.append("email", email);
//       formdata.append("password", password);

//       const response = await axios.post(
//         "https://capital-curve-apis.onrender.com/api/admin/admin-login",
//         formdata, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//       );

//       console.log("API Response:", response.data);

//       const { token } = response.data.result;

//       if (!token) {
//         throw new Error("Invalid token received from server");
//       }

//       localStorage.setItem("token", token);
//       // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       navigate("/admin");
//     } catch (err) {
//       console.error("Login Error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Invalid Credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log("Email", password)



//   return (
//     <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
//       <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
//         <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
//           Sign In
//         </h4>
//         <p className="mb-9 ml-1 text-base text-gray-600">
//           Enter your email and password to sign in!
//         </p>

//         {error && <p className="text-red-500">{error}</p>}

//         <form onSubmit={handleLogin}>
//           {/* <InputField
//             variant="auth"
//             extra="mb-3"
//             label="Email*"
//             placeholder="mail@example.com"
//             id="email"
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           /> */}
//           <label className="block text-sm font-medium text-gray-700 mt-2">Email*</label>
//           <input
//             className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2 "
//             placeholder="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             // onKeyDown={handleTextKeyDown}
//           />

//           <label className="block text-sm font-medium text-gray-700 mt-2">Password *</label>
//           <input
//             className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2 "
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             // onKeyDown={handleTextKeyDown}
//           />

//           {/* <InputField
//             variant="auth"
//             extra="mb-3"
//             label="Password*"
//             placeholder="Min. 8 characters"
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           /> */}


//           <div className="mb-4 flex items-center justify-between px-2">
//             <a
//               className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
//               href="#"
//             >
//               Forgot Password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
//             disabled={loading}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/admin");
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (!email.trim() || !password.trim()) {
//       setError("Email and Password are required");
//       setLoading(false);
//       return;
//     }

//     try {
//       const formdata = new FormData();
//       formdata.append("email", email);
//       formdata.append("password", password);

//       const response = await axios.post(
//         "https://capital-curve-apis.onrender.com/api/admin/admin-login",
//         formdata, {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       const { token } = response.data;
//       if (!token) throw new Error("Invalid token received from server");

//       localStorage.setItem("token", token);
//       console.log("Token Stored:", localStorage.getItem("token"));

//       setTimeout(() => {
//         console.log("Navigating to /admin...");
//         navigate("/admin");
//       }, 100); // Small delay to ensure token is set
//     } catch (err) {
//       console.error("Login Error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Invalid Credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-full w-full items-center justify-center mt-16">
//       <div className="w-full max-w-[400px]">
//         <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
//           Sign In
//         </h4>
//         <p className="mb-4 text-gray-600">Enter your email and password</p>

//         {error && <p className="text-red-500">{error}</p>}

//         <form onSubmit={handleLogin}>
//           <label className="block text-sm font-medium text-gray-700 mt-2">Email*</label>
//           <input
//             className="w-full p-2 border rounded"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label className="block text-sm font-medium text-gray-700 mt-2">Password *</label>
//           <input
//             className="w-full p-2 border rounded"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
//             disabled={loading}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "components/fields/InputField";
import forgot from "../auth/forgotPassword"
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required");
      setLoading(false);
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post(
        "https://capital-curve-apis.onrender.com/api/admin/admin-login",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { token } = response.data.result;

      if (!token) {
        throw new Error("Invalid token received from server");
      }

      localStorage.setItem("token", token);
      navigate("/admin/default");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleForget = async () => {
    try {
      const response = await axios.post('https://capital-curve-apis.onrender.com/api/admin/admin-forgot-password', { email });
      console.log('Email sent successfully');
    } catch (err) {
      console.error('Error sending email:', err.response?.data || err.message);
    }
  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          <label className="block text-sm font-medium text-gray-700 mt-2">Email*</label>
          <input
            className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mt-2">Password *</label>
          <input
            className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link
            to="/auth/admin-forgot-password"
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Forgot Password?
          </Link>


          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
