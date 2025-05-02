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
  Form,
  Input,
  List,
  Avatar,
  Tooltip,
  Space,
} from "antd";
import {
  getAllCourses,
  getCommentsByCourseId,
  paymentFunction,
} from "../../../services/apiServices";
import {
  DollarOutlined,
  UserOutlined,
  BookOutlined,
  LikeOutlined,
  LikeFilled,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function Details() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigate();

  const fetchSelectCourse = async () => {
    setLoading(true);
    try {
      const result = await getAllCourses();
      const select = result.find((item) => item._id === courseId);
      setCourse(select);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchCourseComments = async () => {
    try {
      const result = await getCommentsByCourseId(courseId);
      setComments(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(comments);

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

  const handleCommentSubmit = () => {
    if (!sessionStorage.getItem("token")) {
      navigation("/login");
      toast.error("Please login before commenting!");
      return;
    }

    setSubmitting(true);

    commentForm
      .validateFields()
      .then((values) => {
        // In a real app, you would send this to your API
        const newComment = {
          id: Date.now().toString(),
          author: "Current User", // In a real app, get from user profile
          avatar: "https://joeschmoe.io/api/v1/random",
          content: values.comment,
          likes: 0,
          liked: false,
          datetime: new Date().toLocaleString(),
        };

        setComments([newComment, ...comments]);
        setSubmitting(false);
        commentForm.resetFields();
        toast.success("Comment posted successfully!");
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const handleLike = (commentId) => {
    if (!sessionStorage.getItem("token")) {
      navigation("/login");
      toast.error("Please login before liking comments!");
      return;
    }

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const liked = !comment.liked;
          return {
            ...comment,
            likes: liked ? comment.likes + 1 : comment.likes - 1,
            liked: liked,
          };
        }
        return comment;
      })
    );
  };

  useEffect(() => {
    fetchSelectCourse();
    fetchCourseComments();
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

      <Divider />

      {/* Comments Section */}
      <Row>
        <Col span={24}>
          <Title level={4} style={{ color: "#1677ff" }}>
            Comments
          </Title>

          {/* Comment Form */}
          <Form form={commentForm} onFinish={handleCommentSubmit}>
            <Form.Item
              name="comment"
              rules={[
                { required: true, message: "Please write your comment!" },
              ]}
            >
              <TextArea rows={4} placeholder="Write your comment here..." />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                loading={submitting}
                style={{ backgroundColor: "#1677ff" }}
              >
                Post Comment
              </Button>
            </Form.Item>
          </Form>

          {/* Comments List */}
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment) => (
              <List.Item
                actions={[
                  <Tooltip key="comment-like" title="Like">
                    <span onClick={() => handleLike(comment._id)}>
                      {comment.liked ? <LikeFilled /> : <LikeOutlined />}
                      <span style={{ marginLeft: 8 }}>{comment.likes}</span>
                    </span>
                  </Tooltip>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={comment.avatar}
                      alt={comment.author.username}
                    />
                  }
                  title={
                    <Space>
                      <Text strong>{comment.author.username}</Text>
                      <Tooltip
                        title={dayjs(comment.updatedAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      >
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          {dayjs(comment.updatedAt).format("DD/MM/YYYY HH:mm")}
                        </Text>
                      </Tooltip>
                    </Space>
                  }
                  description={<p>{comment.content}</p>}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Details;
