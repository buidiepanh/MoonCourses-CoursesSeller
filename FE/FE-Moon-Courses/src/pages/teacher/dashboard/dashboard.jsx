import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Col,
  Row,
  Statistic,
  Avatar,
  Typography,
} from "antd";
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
import {
  getAllCourses,
  getAllUsers,
  getAuthenticatedUser,
} from "../../../services/apiServices";

const { Header, Content, Sider, Footer } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const [buyCourses, setBuyCourses] = useState([]);
  const [money, setMoney] = useState(0);

  const fetchAuthenticatedTeacher = async () => {
    try {
      const result = await getAuthenticatedUser();
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  const countNumberOfPurchasedCourses = async () => {
    try {
      const users = await getAllUsers();
      let total = 0;
      let newBuyCourses = [];
      users?.forEach((u) =>
        u?.purchasedCourses.forEach((item) => {
          user?.createdCourses.forEach((c) => {
            if (item.toString() === c.toString()) {
              total++;
              newBuyCourses.push(item);
            }
          });
        })
      );

      setBuyCourses(newBuyCourses);
      setCount(total);
    } catch (error) {
      console.log(error);
    }
  };

  const coutnMoneyOfPurchasedCourses = async () => {
    try {
      const courses = await getAllCourses();
      let total = 0;

      courses.forEach((c) => {
        buyCourses.forEach((item) => {
          if (item.toString() === c._id.toString()) {
            total = total + c.price;
          }
        });
      });
      setMoney(total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logout success!");
    navigation("/login");
  };

  useEffect(() => {
    fetchAuthenticatedTeacher();
  }, []);

  useEffect(() => {
    if (user?.createdCourses) {
      countNumberOfPurchasedCourses();
    }
  }, [user]);

  useEffect(() => {
    if (buyCourses) {
      coutnMoneyOfPurchasedCourses();
    }
  }, [buyCourses]);

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
            defaultSelectedKeys={["1"]}
            style={{ borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Course Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
              Manage Courses
            </Menu.Item>
            <Menu.Item key="3" icon={<DollarOutlined />}>
              Earnings
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              My Profile
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout style={{ padding: "24px" }}>
          <Content>
            <Breadcrumb style={{ marginBottom: 16 }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item>Overview</Breadcrumb.Item>
            </Breadcrumb>

            <Title level={3} style={{ marginBottom: 24 }}>
              Overview Statistics
            </Title>

            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={8}>
                <Card
                  bordered={false}
                  style={{ borderRadius: 12, boxShadow: "0 2px 8px #f0f1f2" }}
                >
                  <Statistic
                    title="Total Courses Created"
                    value={user?.createdCourses.length}
                    valueStyle={{ color: "#1890ff" }}
                    prefix={<BookOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  bordered={false}
                  style={{ borderRadius: 12, boxShadow: "0 2px 8px #f0f1f2" }}
                >
                  <Statistic
                    title="Total Purchases"
                    value={count}
                    valueStyle={{ color: "#52c41a" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  bordered={false}
                  style={{ borderRadius: 12, boxShadow: "0 2px 8px #f0f1f2" }}
                >
                  <Statistic
                    title="Total Earnings"
                    value={money}
                    valueStyle={{ color: "#fa8c16" }}
                    prefixStyle={{ marginRight: 4 }}
                    suffix="VND"
                  />
                </Card>
              </Col>
            </Row>
          </Content>

          {/* Footer */}
          <Footer style={{ textAlign: "center", marginTop: 24 }}>
            ©2025 YourCompany. All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
