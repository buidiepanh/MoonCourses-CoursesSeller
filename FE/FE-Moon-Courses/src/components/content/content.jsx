import React, { useEffect, useState } from "react";
import { Layout, Carousel, Row, Col, Card, Rate, Tag } from "antd";
import { getAllCategories } from "../../services/apiServices";

const { Content } = Layout;
const { Meta } = Card;

const topCourses = [
  {
    id: 1,
    title: "React JS for Beginners",
    image: "https://source.unsplash.com/300x200/?technology",
    rating: 4.8,
    category: "Front-end",
  },
  {
    id: 2,
    title: "Node.js & Express Crash Course",
    image: "https://source.unsplash.com/300x200/?coding",
    rating: 4.7,
    category: "Back-end",
  },
  {
    id: 3,
    title: "Mastering SQL & Database Design",
    image: "https://source.unsplash.com/300x200/?database",
    rating: 4.9,
    category: "Database",
  },
];

function HomeContent() {
  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const result = await getAllCategories();
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <Content style={{ padding: "20px 50px", background: "#f0f2f5" }}>
      {/* Carousel Section */}
      <Carousel autoplay effect="fade" style={{ marginBottom: "30px" }}>
        <div>
          <img
            src="https://source.unsplash.com/1200x400/?learning"
            alt="Slide 1"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
        <div>
          <img
            src="https://source.unsplash.com/1200x400/?coding"
            alt="Slide 2"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
        <div>
          <img
            src="https://source.unsplash.com/1200x400/?technology"
            alt="Slide 3"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      </Carousel>

      {/* Category Section */}
      <h2 style={{ color: "#1890ff", marginBottom: "20px" }}>Categories</h2>
      <Row gutter={[16, 16]} justify="center">
        {categories.map((category, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={4}>
            <Card
              hoverable
              style={{
                textAlign: "center",
                backgroundColor: "#e6f7ff",
                border: "1px solid #1890ff",
              }}
            >
              <h3 style={{ color: "#1890ff" }}>{category.title}</h3>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Top Rated Courses Section */}
      <h2 style={{ color: "#1890ff", marginTop: "40px", marginBottom: "20px" }}>
        Top Rated Courses
      </h2>
      <Row gutter={[16, 16]}>
        {topCourses.map((course) => (
          <Col key={course.id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <img
                  alt={course.title}
                  src={course.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              }
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <Meta title={course.title} />
              <div style={{ marginTop: "10px" }}>
                <Tag color="blue">{course.category}</Tag>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={course.rating}
                  style={{ float: "right" }}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Content>
  );
}

export default HomeContent;
