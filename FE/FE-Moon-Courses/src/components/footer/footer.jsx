import React from "react";
import { Layout, Row, Col } from "antd";

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter
      style={{
        backgroundColor: "#1890ff",
        color: "#fff",
        padding: "40px 50px",
      }}
    >
      <Row gutter={[32, 16]}>
        <Col xs={24} sm={12} md={8}>
          <h3 style={{ color: "#fff" }}>Moon Course</h3>
          <p>
            Empowering your learning journey with high-quality online courses.
          </p>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <h4 style={{ color: "#fff" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>
              <a href="#" style={{ color: "#fff" }}>
                Home
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "#fff" }}>
                Courses
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "#fff" }}>
                About
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "#fff" }}>
                Contact
              </a>
            </li>
          </ul>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <h4 style={{ color: "#fff" }}>Contact Us</h4>
          <p>Email: support@mooncourse.com</p>
          <p>Phone: +1 234 567 890</p>
        </Col>
      </Row>

      <div style={{ textAlign: "center", marginTop: "30px", color: "#e0f0ff" }}>
        © {new Date().getFullYear()} Moon Course. All rights reserved.
      </div>
    </AntFooter>
  );
}

export default Footer;
