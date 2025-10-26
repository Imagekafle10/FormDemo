import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile, updateUserProfile } from "../api/profile.api";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 
  const [form] = Form.useForm();

  console.log(user);
  
//   useEffect(() => {
//     dispatch(fetchUserProfile());
//   }, [dispatch]);

  // Populate form with fetched user data
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user?.users.firstname,
        email: user?.users.email,
        phone: user?.users.phone,
        company: user?.users.company,
        address: user?.users.address,
      });
    }
  }, [user, form]);

  const onFinish = (values) => {
    console.log("Form Values:", values);
    // dispatch(updateUserProfile(values))
    //   .then(() => message.success("Profile updated successfully"))
    //   .catch(() => message.error("Failed to update profile"));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">User Profile</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          email: "",
          phone: "",
          company: "",
          address: "",
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter your phone number" }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: "Please enter your company" }]}
        >
          <Input placeholder="Enter your company name" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input.TextArea placeholder="Enter your address" rows={3} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Save Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
