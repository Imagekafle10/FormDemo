import React from "react";
import { Button, Checkbox, Form, Input, message, Select, Upload } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../api/auth.api";
import { Link, useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      formData.append("firstname", values.firstname);
      formData.append("lastname", values.lastname);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("gender", values.gender);
      formData.append("status", values.status);
      formData.append("description", values.description);
      formData.append("skill", values.skill);

      if (values.resume && values.resume[0]) {
        formData.append("resume", values.resume[0].originFileObj);
      }

      const res = await dispatch(loginUser(formData)).unwrap();

      if (res) {
        navigate("/loginuser");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-8">
      {/* Responsive Container */}
      <div className="bg-white shadow-2xl w-full max-w-2xl md:max-w-3xl lg:max-w-4xl h-auto md:h-[90vh] overflow-y-auto p-6 md:p-8 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 text-center">
          Create Account
        </h2>

        <Form
          layout="vertical"
          onFinish={onFinish}
          disabled={loading}
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[{ required: true, message: "Please input your first name!" }]}
            >
              <Input placeholder="John" className="rounded-lg" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[{ required: true, message: "Please input your last name!" }]}
            >
              <Input placeholder="Doe" className="rounded-lg" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, type: "email", message: "Please input your email!" },
              ]}
            >
              <Input placeholder="example@mail.com" className="rounded-lg" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="********" className="rounded-lg" />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select your gender!" }]}
            >
              <Select placeholder="Select gender" className="rounded-lg">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select status!" }]}
            >
              <Select placeholder="Select status" className="rounded-lg">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <TextArea
              rows={4}
              placeholder="Tell us about yourself..."
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Upload File"
            name="resume"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Please upload a file!" }]}
          >
            <Upload beforeUpload={() => false} className="w-full">
              <Button icon={<UploadOutlined />} className="w-full rounded-lg">
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Skill"
            name="skill"
            rules={[{ required: true, message: "Please input your skill!" }]}
          >
            <Input
              className="rounded-lg"
              placeholder="e.g., React, Angular, Node, Java"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="text-gray-600">Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingOutlined spin /> Register
                </>
              ) : (
                "Register"
              )}
            </Button>
          </Form.Item>

          <div className="text-center text-sm md:text-base">
            Already have an account?{" "}
            <Link to="/loginuser" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
