import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Layout,
  Menu,
  List,
  Card,
  Spin,
  Avatar,
  Divider,
} from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { getAllCourses } from "../../../services/apiServices";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;
const { Sider, Content } = Layout;

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
    contents: [
      { title: "Introduction to Angular", content: "Welcome to Angular!" },
      { title: "Components and Templates", content: "Learn about components." },
      { title: "Routing in Angular", content: "Let's set up routes." },
    ],
  },
];

function Learning() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  const fetchSelectedCourse = async () => {
    try {
      const result = await getAllCourses();
      const select = result.find((item) => item._id === courseId);
      console.log(select);
      setCourse(select);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSelectedCourse();
  }, []);

  if (!course) {
    return (
      <div style={{ padding: 100, textAlign: "center" }}>
        <Title level={3}>No course found!</Title>
      </div>
    );
  }

  const selectedLesson = course.contents[selectedLessonIndex];
  const videoUrl = selectedLesson.video
    ? selectedLesson.video.replace("watch?v=", "embed/")
    : "";

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f5ff" }}>
      <Sider width={280} style={{ background: "#ffffff", padding: 20 }}>
        <Title level={4} style={{ color: "#1677ff" }}>
          {course.title}
        </Title>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <Avatar icon={<UserOutlined />} />
          <Text style={{ marginLeft: 10 }}>
            Author: {course.author.username}
          </Text>
        </div>
        <Divider />
        <Title level={5} style={{ color: "#1677ff" }}>
          Course's Content
        </Title>
        <Menu
          mode="inline"
          selectedKeys={[String(selectedLessonIndex)]}
          onClick={(e) => setSelectedLessonIndex(Number(e.key))}
          style={{ border: "none" }}
        >
          {course.contents.map((lesson, index) => (
            <Menu.Item key={index} icon={<BookOutlined />}>
              {lesson.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{ padding: 24, background: "#f0f5ff", minHeight: "100vh" }}
      >
        <Content
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            padding: 32,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <Title level={3} style={{ color: "#1677ff" }}>
            {selectedLesson.title}
          </Title>

          <Text type="secondary">
            Last updated:{" "}
            {dayjs(selectedLesson.updatedAt).format("MMMM D, YYYY")}
          </Text>

          <Divider />

          <Card
            type="inner"
            title="Theory"
            style={{ marginBottom: 24, backgroundColor: "#f9fbff" }}
          >
            <Paragraph style={{ fontSize: "16px", lineHeight: 1.75 }}>
              {selectedLesson.theory}
            </Paragraph>
          </Card>

          <Card
            type="inner"
            title="Video Tutorial"
            style={{ backgroundColor: "#f9fbff" }}
          >
            {videoUrl ? (
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  src={videoUrl}
                  title="Lesson Video"
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                  }}
                ></iframe>
              </div>
            ) : (
              <Text type="secondary">No video available</Text>
            )}
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Learning;
