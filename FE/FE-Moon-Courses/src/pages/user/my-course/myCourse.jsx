import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Rate, Avatar } from "antd";
import {
  getAllCategories,
  getAllUsers,
  getAuthenticatedUser,
} from "../../../services/apiServices";

const { Title, Paragraph, Text } = Typography;

function MyCourse() {
  const [courses, setCourses] = useState([]);

  const getUserCourse = async () => {
    try {
      const result = await getAuthenticatedUser();
      const users = await getAllUsers();
      const categories = await getAllCategories();

      const newCourses = result.purchasedCourses.map((course) => {
        const author = users.find((user) => user._id === course.author);
        const category = categories.find((cat) => cat._id === course.category);
        return {
          ...course,
          author: author?.username || "Unknown",
          category: category?.title || "N/A",
        };
      });

      setCourses(newCourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCourse();
  }, []);

  return (
    <div
      style={{ padding: 30, backgroundColor: "#f0f5ff", minHeight: "100vh" }}
    >
      <Title level={2} style={{ color: "#1677ff" }}>
        My Courses
      </Title>
      <Row gutter={[0, 24]}>
        {courses.map((course) => (
          <Col span={24} key={course._id}>
            <Card
              hoverable
              style={{
                display: "flex",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              bodyStyle={{ display: "flex", padding: 20 }}
            >
              <img
                src={course.image}
                alt={course.title}
                style={{
                  width: 200,
                  height: 130,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginRight: 20,
                }}
              />
              <div style={{ flex: 1 }}>
                <Title level={4} style={{ marginBottom: 4 }}>
                  {course.title}
                </Title>
                <Text type="secondary">{course.category}</Text>
                <Paragraph style={{ margin: "8px 0" }} ellipsis={{ rows: 2 }}>
                  {course.description}
                </Paragraph>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar size="small">{course.author[0]}</Avatar>
                  <Text>{course.author}</Text>
                  <Rate disabled allowHalf defaultValue={course.rating} />
                  <Text type="secondary">
                    ({course.comments.length} comments)
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MyCourse;
