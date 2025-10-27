import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Typography } from "antd";
import { useSelector } from "react-redux";

const { Header, Sider, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Container = () => {

  const {loading ,user,isloggedIn} = useSelector(state=>state.auth);
 console.log(user,isloggedIn);
 
  return (loading && "Loading" ||
    <Layout>
    

      <Content className="p-2 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow">
          <Title level={3}>Welcome {user?.users?.firstname.toUpperCase() || null} to MyApp Dashboard</Title>
          <Paragraph>
            This is the home page of your dashboard built using Ant Design
            and Tailwind CSS. You can customize this area with cards, charts,
            and other components as needed.
          </Paragraph>
        </div>
      </Content>

      <Footer className="text-center bg-gray-200">
        © {new Date().getFullYear()} MyApp | All Rights Reserved
      </Footer>
    </Layout>
    
  )
};

export default Container;
