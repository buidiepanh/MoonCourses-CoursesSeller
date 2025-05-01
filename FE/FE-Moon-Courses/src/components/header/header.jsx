import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Dropdown, Space, Avatar } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { getAuthenticatedUser } from "../../services/apiServices";
import toast from "react-hot-toast";

const { Header: AntHeader } = Layout;

function Header() {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);
  const token = sessionStorage.getItem("token");

  const fetchAuthenticatedUser = async () => {
    try {
      const result = await getAuthenticatedUser();
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    toast.success("Logout success!");
    navigation("/login");
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

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
          cursor: "pointer",
        }}
        onClick={() => navigation("/")}
      >
        Moon Course
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        style={{ backgroundColor: "#1890ff" }}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1" onClick={() => navigation("/")}>
          Home
        </Menu.Item>
        <Menu.Item key="2">Courses</Menu.Item>
        <Menu.Item key="3">My Courses</Menu.Item>
        <Menu.Item key="4">About</Menu.Item>
        <Menu.Item key="5">Contact</Menu.Item>
      </Menu>

      {!token ? (
        <Space>
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigation("/login")}
          >
            Log In
          </Button>
          <Button
            icon={<UserAddOutlined />}
            onClick={() => navigation("/register")}
          >
            Sign Up
          </Button>
        </Space>
      ) : (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" icon={<UserOutlined />}>
                Profile
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<LogoutOutlined />}
                onClick={handleLogOut}
              >
                Logout
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Space style={{ cursor: "pointer" }}>
            <Avatar style={{ backgroundColor: "#1677ff" }}>
              {user?.username?.charAt(0)?.toUpperCase()}
            </Avatar>
            <span style={{ color: "white", fontWeight: 500 }}>
              Welcome, {user?.username}
            </span>
          </Space>
        </Dropdown>
      )}
    </AntHeader>
  );
}

export default Header;
