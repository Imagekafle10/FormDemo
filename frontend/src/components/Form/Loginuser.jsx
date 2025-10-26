import React from "react";
import { Button, Checkbox, Form, Input, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUserFetch } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const LoginUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const{loading} = useSelector((state)=>state.auth)
  const onFinish = async(values) => {
        
        const res = await dispatch(loginUserFetch(values)).unwrap();
        if(res){
            // console.log(res);
            
            navigate("/dashboard");
        }

    
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <Card
        className="shadow-xl rounded-2xl w-full max-w-md"
        bordered={false}
      >
        <h1 className="text-3xl font-semibold text-center mb-6 text-black">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Please log in to your account
        </p>

        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          disabled={loading}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="firstname"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}
          >
            <Input
              placeholder="Enter your username"
              className="rounded-lg py-2"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="rounded-lg py-2"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item
              name="remember"
              valuePropName="checked"
              className="mb-0"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a
              href="#"
              className="text-blue-500 text-sm hover:underline hover:text-blue-600"
            >
              Forgot password?
            </a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-white font-medium"
            >
             {loading ? "Login...":"Login"} 
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-blue-500 font-medium hover:underline hover:text-blue-600"
          >
            <Link to="/login">Sign up</Link>
            
          </a>
        </p>
      </Card>
    </div>
  );
};

export default LoginUser;
