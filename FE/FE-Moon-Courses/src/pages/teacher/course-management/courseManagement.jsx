import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Table,
  Space,
  Typography,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getAllCategories,
  getAuthenticatedUser,
  postNewCourse,
} from "../../../services/apiServices";
import toast from "react-hot-toast";

const { Title } = Typography;
const { Option } = Select;

const CourseManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const fetchCreatedCourses = async () => {
    try {
      const user = await getAuthenticatedUser();
      setCourses(user.createdCourses.map((item) => item));
      setTeacherId(user._id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const result = await getAllCategories();
      setCategories(result.map((item) => item));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchCreatedCourses();
  }, []);

  const handleAddCourse = async () => {
    try {
      const { title, image, description, rating, price, category } =
        form.getFieldValue();
      const result = await postNewCourse(
        title,
        image,
        description,
        rating,
        price,
        category,
        teacherId
      );

      if (result) {
        toast.success("Add new course success!");
        setIsModalOpen(false);
        fetchCreatedCourses();
      } else {
        toast.error("Add new course failed!");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (key) => {
    setCourses(courses.filter((course) => course.key !== key));
  };

  const handleUpdate = (record) => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
    // Optional: Add update logic if needed
  };

  const columns = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (url) => <img src={url} alt="Course" width={80} />,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Price (VND)",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (categoryId) => {
        const cate = categories.find((item) => item._id === categoryId);
        return cate ? cate.title : "N/A";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
            type="link"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            type="link"
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: "#1890ff" }}>
        Course Management
      </Title>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: 16 }}
      >
        Add Course
      </Button>

      <Table columns={columns} dataSource={courses} bordered />

      <Modal
        title="Add New Course"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddCourse}
        okText="Save"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please enter the course title" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please enter the rating" }]}
          >
            <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select category">
              {categories.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagement;
