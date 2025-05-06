import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  DollarOutlined,
  UserOutlined,
  LogoutOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getAuthenticatedUser } from "../../../services/apiServices";
import Overview from "../overview/overview";
import CourseManagement from "../course-management/courseManagement";

const { Header, Sider } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);
  const [menuItem, setMenuItem] = useState("overview");

  const fetchAuthenticatedTeacher = async () => {
    try {
      const result = await getAuthenticatedUser();
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logout success!");
    navigation("/login");
  };

  const renderContent = () => {
    switch (menuItem) {
      case "overview":
        return <Overview />;
      case "course-management":
        return <CourseManagement />;
      default:
        return <Overview />;
    }
  };

  useEffect(() => {
    fetchAuthenticatedTeacher();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header style={{ backgroundColor: "#1890ff", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BookOutlined style={{ fontSize: 24, color: "#fff" }} />
            <Title level={4} style={{ color: "#fff", margin: 0 }}>
              Teacher Dashboard
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ backgroundColor: "transparent" }}
          >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<LogoutOutlined />}
              onClick={() => handleLogout()}
            >
              Logout
            </Menu.Item>
          </Menu>
        </div>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider
          width={220}
          style={{
            background: "#fff",
            borderRight: "1px solid #f0f0f0",
            paddingTop: 24,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <Text strong style={{ display: "block", marginTop: 8 }}>
              Welcome, Teacher {user?.username}
            </Text>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={menuItem}
            onClick={({ key }) => setMenuItem(key)}
            style={{ borderRight: 0 }}
          >
            <Menu.Item key="overview" icon={<DashboardOutlined />}>
              Overview Dashboard
            </Menu.Item>
            <Menu.Item key="course-management" icon={<UnorderedListOutlined />}>
              Manage Courses
            </Menu.Item>
            <Menu.Item key="earnings" icon={<DollarOutlined />}>
              Earnings
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              My Profile
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout style={{ padding: "24px" }}>{renderContent()}</Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
