import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Rate, Avatar } from "antd";

const { Title, Paragraph, Text } = Typography;

const mockCourses = [
  {
    _id: "1",
    title: "Mastering Angular",
    image:
      "https://miro.medium.com/v2/resize:fit:1200/format:webp/1*6kRrK2ExnK7wZ1z6isCyyA.png",
    description:
      "A complete Angular course covering components, routing, and RxJS.",
    author: "Jane Doe",
    rating: 4.8,
    comments: 12,
    category: "Frontend",
  },
  {
    _id: "2",
    title: "React for Beginners",
    image: "https://reactjs.org/logo-og.png",
    description: "Learn React from scratch and build modern UIs effortlessly.",
    author: "John Smith",
    rating: 4.5,
    comments: 24,
    category: "Frontend",
  },
  {
    _id: "3",
    title: "Node.js Backend Development",
    image:
      "https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg",
    description: "Build scalable backend APIs using Node.js and Express.",
    author: "Michael Chan",
    rating: 4.6,
    comments: 18,
    category: "Backend",
  },
];

function MyCourse() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fake API call
    setTimeout(() => {
      setCourses(mockCourses);
    }, 300);
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
                  <Text type="secondary">({course.comments} comments)</Text>
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
