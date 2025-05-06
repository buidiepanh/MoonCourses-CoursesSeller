import React, { useEffect, useState } from "react";
import {
  getAllCourses,
  getAllUsers,
  getAuthenticatedUser,
} from "../../../services/apiServices";
import {
  Layout,
  Breadcrumb,
  Card,
  Col,
  Row,
  Statistic,
  Typography,
} from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { Title } = Typography;

function Overview() {
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
            if (item.toString() === c._id.toString()) {
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
    <div>
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
    </div>
  );
}

export default Overview;
