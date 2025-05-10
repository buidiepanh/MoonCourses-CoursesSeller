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
  deleteCourse,
  getAllCategories,
  getAuthenticatedUser,
  postNewCourse,
  postNewCourseContent,
  updateCourse,
} from "../../../services/apiServices";
import toast from "react-hot-toast";

const { Title } = Typography;
const { Option } = Select;

const CourseManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState(false);
  const [contentForm] = Form.useForm();
  const [courseId, setCourseId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [curCourse, setCurCourse] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurCourse(null);
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

  const handleAddNewCourse = async () => {
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
        fetchCreatedCourses();
      } else {
        toast.error("Add new course failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (record) => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
    setCurCourse(record);
    setIsUpdate(true);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteCourse(id);

      if (!result) {
        toast.error("Delete course failed!");
      } else {
        toast.success("Delete course success!");
      }

      fetchCreatedCourses();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const values = form.getFieldValue();
    if (!isUpdate) {
      handleAddNewCourse();
    } else {
      try {
        const result = await updateCourse(
          curCourse._id,
          values.title,
          values.image,
          values.description,
          values.rating,
          values.price,
          values.category
        );

        if (result) {
          toast.success("Update course success!");
          fetchCreatedCourses();
        } else {
          toast.error("Update course failed!");
        }
      } catch (error) {
        console.log(error);
      }
    }

    closeModal();
  };

  const handleSubmitContent = async (courseId) => {
    const values = contentForm.getFieldValue();
    try {
      const result = await postNewCourseContent(
        courseId,
        values.title,
        values.theory,
        values.video
      );

      if (result) {
        toast.success("Add content to course success!");
        setContentModal(false);
      } else {
        toast.error("Add content to course failed!");
        setContentModal(false);
      }

      contentForm.resetFields();
    } catch (error) {
      console.log(error);
    }
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
      render: (price) => price?.toLocaleString("vi-VN"),
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
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
            type="link"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            type="link"
            danger
          />
          <Button
            type="primary"
            onClick={() => {
              setContentModal(true);
              setCourseId(record._id);
              contentForm.resetFields();
            }}
          >
            + Content
          </Button>
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
        title={isUpdate ? "Update course" : "Add New Course"}
        visible={isModalOpen}
        onCancel={closeModal}
        onOk={handleSubmit}
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

      {/*==================Content Modal================ */}
      <Modal
        title="Add Content"
        visible={contentModal}
        onCancel={() => setContentModal(false)}
        onOk={() => handleSubmitContent(courseId)}
        okText="Add"
      >
        <Form form={contentForm} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter content title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Theory"
            name="theory"
            rules={[{ required: true, message: "Please enter theory" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Video URL"
            name="video"
            rules={[{ required: true, message: "Please enter video URL" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagement;
