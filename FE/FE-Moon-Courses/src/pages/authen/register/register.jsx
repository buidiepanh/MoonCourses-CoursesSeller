import React from "react";
import { Row, Col, Form, Input, Button, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { registerFunction } from "../../../services/apiServices";

const { Title, Text } = Typography;

function Register() {
  const navigation = useNavigate();

  const onFinish = async (values) => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const result = await registerFunction(username, email, password);

      if (result?.success) {
        toast.success("Register success!");
        navigation("/login");
      } else {
        toast.error("Register failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row style={{ minHeight: "100vh" }}>
      {/* Left side: Image */}
      <Col
        span={12}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1577896851231-70ef18881754')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right side: Register form */}
      <Col
        span={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 40px",
          backgroundColor: "#f0f5ff",
        }}
      >
        <div style={{ width: "100%", maxWidth: 400 }}>
          <Title level={2} style={{ color: "#1677ff" }}>
            Create Your Account
          </Title>
          <Text type="secondary">Please register to continue</Text>

          <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 30 }}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your username"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: "#1677ff" }}
              >
                Sign Up
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: 10 }}>
              <Text>
                Already have an account?{" "}
                <a href="/login" style={{ color: "#1677ff" }}>
                  Log in
                </a>
              </Text>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default Register;
