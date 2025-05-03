import React, { useEffect, useState } from "react";
import { Layout, Carousel, Row, Col, Card, Rate, Tag } from "antd";
import { getAllCategories, getAllCourses } from "../../services/apiServices";
import image1 from "../../assets/carousel_images/img1.jpg";
import image2 from "../../assets/carousel_images/img2.jpg";
import image3 from "../../assets/carousel_images/img3.jpg";
import { useNavigate } from "react-router";

const { Content } = Layout;
const { Meta } = Card;

function HomeContent() {
  const navigation = useNavigate();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const result = await getAllCategories();
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const result = await getAllCourses();
      setCourses(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllCourses();
  }, []);

  return (
    <Content style={{ padding: "20px 50px", background: "#f0f2f5" }}>
      {/* Carousel Section */}
      <Carousel autoplay effect="fade" style={{ marginBottom: "30px" }}>
        <div>
          <img
            src={image1}
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
            src={image2}
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
            src={image3}
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
        {courses.map((course) => (
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
              onClick={() => navigation(`/${course._id}`)}
            >
              <Meta title={course.title} />
              <div style={{ marginTop: "10px" }}>
                <Tag color="blue">{course.category.title}</Tag>
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
