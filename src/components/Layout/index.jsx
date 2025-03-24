import React from "react";
import Navbar from "../Navbar";
import { useAuthStore } from "../../services";

const Layout = ({ children, isLandingPage = false }) => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <>
      <Navbar 
        isLandingPage={isLandingPage} 
        isAuthenticated={isAuthenticated} 
      />
      {children}
    </>
  );
};

export default Layout;