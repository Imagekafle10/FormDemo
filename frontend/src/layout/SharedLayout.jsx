import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

function SharedLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Callback function to receive collapse state from Sidebar
  const handleSidebarClick = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar fixed at top */}
      <div className="fixed w-full z-10">
        <Navbar />
      </div>

      {/* Main Layout */}
      <Layout className="flex flex-1 mt-14 h-screen">
        {/* Sidebar */}
        <div className={`fixed h-full z-10`}>
          <Sidebar btnClick={handleSidebarClick} />
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-300 p-2  ${
            isSidebarCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Outlet>{children}</Outlet>
        </div>
      </Layout>
    </div>
  );
}

export default SharedLayout;
