import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
  } from "react-router-dom";
  import LoginPage from "./components/LoginPage";
  import AdminPage from "./components/AdminPage";
  import CreateEmployeePage from "./components/CreateEmployeePage";
  import AllEmployeesPage from "./components/AllEmployeesPage";
  import UpdateEmployeePage from "./components/UpdateEmployeePage";
  import Navbar from "./components/Navbar";
  
export default function MainApp() {
    const location = useLocation();

    // Conditionally render the Navbar based on the route
    const shouldShowNavbar = location.pathname !== "/";
    return (
      <>
        {shouldShowNavbar && <Navbar />}{" "}
        {/* Show Navbar on all pages except login */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/create-employee" element={<CreateEmployeePage />} />
            <Route path="/all-employees" element={<AllEmployeesPage />} />
            <Route path="/update-employee/:id" element={<UpdateEmployeePage />} />
          </Routes>
      </>
    );
}
