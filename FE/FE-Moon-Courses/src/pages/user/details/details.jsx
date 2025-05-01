import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Row,
  Col,
  Card,
  Typography,
  Rate,
  Tag,
  Divider,
  Spin,
  Button,
} from "antd";
import { getAllCourses, paymentFunction } from "../../../services/apiServices";
import { DollarOutlined, UserOutlined, BookOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const { Title, Text, Paragraph } = Typography;

function Details() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  const fetchSelectCourse = async () => {
    try {
      const result = await getAllCourses();
      const select = result.find((item) => item._id === courseId);
      setCourse(select);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePurchase = async (price) => {
    if (!sessionStorage.getItem("token")) {
      navigation("/login");
      toast.error("Please login before purchasing!");
    } else {
      try {
        const resutl = await paymentFunction(price);
        window.location.href = resutl.url;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchSelectCourse();
  }, []);

  if (loading || !course) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 80px", backgroundColor: "#f0f5ff" }}>
      <Row gutter={[40, 20]}>
        {/* Course Image */}
        <Col xs={24} md={10}>
          <Card
            hoverable
            cover={
              <img
                alt={course.title}
                src={
                  course.image ||
                  "https://via.placeholder.com/400x250?text=Course+Image"
                }
              />
            }
            style={{ borderRadius: 12 }}
          />
        </Col>

        {/* Course Info */}
        <Col xs={24} md={14}>
          <Title level={2} style={{ color: "#1677ff" }}>
            {course.title}
          </Title>
          <Text type="secondary">
            <BookOutlined /> Category: {course.category?.title}
          </Text>
          <br />
          <Text type="secondary">
            <UserOutlined /> Author: {course.author?.username}
          </Text>
          <Divider />
          <div style={{ marginBottom: 16 }}>
            <Text strong>Rating:</Text>{" "}
            <Rate disabled allowHalf defaultValue={course.rating} />
            <Tag color="blue" style={{ marginLeft: 8 }}>
              {course.rating.toFixed(1)}
            </Tag>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Price:</Text>{" "}
            <Tag color="geekblue" style={{ fontSize: 16 }}>
              <DollarOutlined /> {course.price.toLocaleString()} VND
            </Tag>
          </div>
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: "#1677ff" }}
            onClick={() => handlePurchase(course.price)}
          >
            Enroll Now
          </Button>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24}>
          <Title level={4} style={{ color: "#1677ff" }}>
            Course Description
          </Title>
          <Paragraph style={{ fontSize: 16, lineHeight: 1.7 }}>
            {course.description || "No description available."}
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}

export default Details;
