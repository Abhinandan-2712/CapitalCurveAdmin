// // import React, { useEffect, useState } from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import AdminLayout from "layouts/admin";
// // import AuthLayout from "layouts/auth";

// // const App = () => {
// //   const [token, setToken] = useState(localStorage.getItem("token") || null);

// //   useEffect(() => {
// //     // Check for token on first load
// //     const storedToken = localStorage.getItem("token");
// //     setToken(storedToken);
// //   }, []);

// //   return (
// //     <Routes>
// //       {/* If token exists, navigate to admin, otherwise go to login */}
// //       <Route path="auth/*" element={<AuthLayout />} />
// //       <Route 
// //         path="admin/*" 
// //         element={token ? <AdminLayout /> : <Navigate to="/auth/sign-in" replace />} 
// //       />
// //       <Route 
// //         path="/" 
// //         element={token ? <Navigate to="/admin" replace /> : <Navigate to="/auth/sign-in" replace />} 
// //       />
// //     </Routes>
// //   );
// // };

// // export default App;


// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLayout from "layouts/admin";
// import AuthLayout from "layouts/auth";

// const App = () => {
//   const [token, setToken] = useState(() => localStorage.getItem("token"));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setToken(localStorage.getItem("token"));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <Routes>
//       <Route path="auth/*" element={<AuthLayout />} />
//       <Route 
//         path="admin/*" 
//         element={token ? <AdminLayout /> : <Navigate to="/auth/sign-in" replace />} 
//       />
//       <Route 
//         path="/" 
//         element={token ? <Navigate to="/admin" replace /> : <Navigate to="/auth/sign-in" replace />} 
//       />
//       <Route 
//         path="*" 
//         element={<Navigate to={token ? "/admin" : "/auth/sign-in"} replace />} 
//       />
//     </Routes>
//   );
// };

// export default App;


// App.js



// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import AdminLayout from "layouts/admin";
// import AuthLayout from "layouts/auth";

// const App = () => {
//   const [token, setToken] = useState(() => localStorage.getItem("token"));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setToken(localStorage.getItem("token"));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <Routes>
//       <Route path="auth/*" element={<AuthLayout />} />
//       <Route 
//         path="admin/*" 
//         element={token ? <AdminLayout /> : <Navigate to="/auth/sign-in" replace />} 
//       />
//       <Route 
//         path="/" 
//         element={token ? <Navigate to="/admin" replace /> : <Navigate to="/auth/sign-in" replace />} 
//       />
//       <Route 
//         path="*" 
//         element={<Navigate to={token ? "/admin" : "/auth/sign-in"} replace />} 
//       />
//     </Routes>
//   );
// };

// export default App;



import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import ProtectedRoute from "./views/auth/ProtectedRoute"

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="auth/*" element={<AuthLayout />} />

      {/* Protected Routes */}
      <Route
        path="admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to admin or login */}
      <Route
        path="/"
        element={<Navigate to={token ? "/admin/default" : "/auth/sign-in"} replace />}
      />

      {/* Fallback Route */}
      <Route
        path="*"
        element={<Navigate to={token ? "/admin/default" : "/auth/sign-in"} replace />}
      />
    </Routes>
  );
};

export default App;
