import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/authSlice";


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleMenuClick =({key}) =>{
      if(key === "3"){
        dispatch(logOut());
      
        navigate("/loginuser")
      }else{
        if(key === "1"){
          navigate("/profile")
        }
      }
    }

        const accountMenu = (
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2">Settings</Menu.Item>
            <Menu.Item key="3" >Logout</Menu.Item>
            
          </Menu>
        );

  return (
    <div className="bg-gray-900 text-white flex w-screen  items-center justify-between px-6 py-3">
      <div className="text-xl font-bold">MyApp</div>

      <div className="flex items-center space-x-6">

        <Dropdown overlay={accountMenu} trigger={['click']}>
          <Button
            type="text"
            className="!text-white flex items-center hover:!text-white"
          >
            Administrator <DownOutlined className="ml-1" />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
