import React from "react";
import { Layout, Menu, Button } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

function Header() {
  return (
    <AntHeader
      style={{
        backgroundColor: "#1890ff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        Moon Course
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        style={{ backgroundColor: "#1890ff" }}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Courses</Menu.Item>
        <Menu.Item key="3">About</Menu.Item>
        <Menu.Item key="4">Contact</Menu.Item>
      </Menu>

      <div>
        <Button
          type="primary"
          icon={<LoginOutlined />}
          style={{ marginRight: "10px" }}
        >
          Log In
        </Button>
        <Button icon={<UserAddOutlined />}>Sign Up</Button>
      </div>
    </AntHeader>
  );
}

export default Header;
