import React from "react";
import { Row, Col, Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { loginFunction } from "../../../services/apiServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

function Login() {
  const navigation = useNavigate();

  const onFinish = async (values) => {
    try {
      const result = await loginFunction(values.email, values.password);

      if (result) {
        toast.success("Login success!");
        sessionStorage.setItem("token", result.accessToken);
        navigation("/");
      } else {
        toast.error("Login failed!");
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

      {/* Right side: Login form */}
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
            Welcome to Moon Course
          </Title>
          <Text type="secondary">Please sign in to continue</Text>

          <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 30 }}>
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: "#1677ff" }}
              >
                Log In
              </Button>
            </Form.Item>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <Text>
                Don't have an account?{" "}
                <a href="/register" style={{ color: "#1677ff" }}>
                  Sign up
                </a>
              </Text>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
