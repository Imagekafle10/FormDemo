import React, { useState } from "react";
import { Menu, Button } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  MailOutlined,
  AccountBookOutlined,
  CarryOutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/authSlice";

const { SubMenu } = Menu;

const Sidebar = ({btnClick}) => {
  const location = useLocation();
const active = location.pathname.split("/")[1] || "dashboard"; 
// console.log(location);

  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(active); // only one active item
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuData = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <AccountBookOutlined />,
    },
    ,
    {
      key: "portfolio",
      label: "Portfolio",
      icon: <AccountBookOutlined />,
    },
    {
      key: "shares",
      label: "Shares",
      icon: <CarryOutOutlined />,
    },
    {
      key: "users",
      label: "Users",
      icon: <UserOutlined />,
      children: [
        { key: "allUsers", label: "All Users" },
        { key: "addUser", label: "Add User" },
        { key: "userSettings", label: "User Settings" },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      children: [
        { key: "profileSettings", label: "Profile Settings" },
        { key: "appSettings", label: "App Settings" },
      ],
    },
    {
      key: "messages",
      label: "Messages",
      icon: <MailOutlined />,
      children: [
        { key: "inbox", label: "Inbox" },
        { key: "sent", label: "Sent" },
        { key: "drafts", label: "Drafts" },
      ],
    },
  ];

  const handleClick = (key) => {
    setActiveItem(key);
    if (key === "dashboard") {
      // dispatch(logOut());
      navigate(`/${key}`);
    }else  if (key ==="portfolio"){
     navigate(`/${key}`);
    }
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white   font-me flex flex-col  transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Collapse Button */}
      <div className="flex justify-end p-2">
        <Button
          type="text"
          onClick={() =>  {
            const newCollapsed = !collapsed;
            setCollapsed(newCollapsed);
            if(btnClick) btnClick(newCollapsed);
          
          }}
          className="!text-white"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        selectedKeys={[activeItem]}
        // defaultSelectedKeys={["dashboard"]}
        className="flex-1 font-light bg-gray-900"
      >
        {menuData.map((item) =>
          item.children ? (
            <SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  onClick={() => handleClick(child.key)}
                  className="font-light"
                >
                  {child.label}
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleClick(item.key)}
              className="font-light"
            >
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu>
    </div>
  );
};

export default Sidebar;
