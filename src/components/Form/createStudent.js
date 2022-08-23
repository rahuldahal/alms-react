import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { getAllCourses } from "../../services/courses";
import { createStudent } from "../../services/students";

const { Option } = Select;

export default function CreateStudentForm({
  visible,
  setMakeModalVisible,
  onCancel,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [coursePlaceholder, setCoursePlaceholder] =
    useState("Loading Courses...");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!visible) {
      console.log("create student...");
      setConfirmLoading(false);
    }
  }, [visible]);

  useEffect(
    () => async () => {
      const { courses } = await getAllCourses();

      setCourses(courses);
    },
    []
  );

  useEffect(() => {
    if (!courses.length) {
      return;
    }

    setCoursePlaceholder("Choose the Course");
  }, [courses]);

  const handleStudentCreation = async (values) => {
    const { fullName, email, password, course, batch, semester } = values;
    console.log(values);

    const { status } = await createStudent({
      fullName,
      email,
      password,
      course,
      batch,
      semester,
      role: "STUDENT",
    });
    console.log(status);

    // TODO: update the attendance table after successful creation.
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      form.resetFields();
      await handleStudentCreation(values);
      setMakeModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  const randomPassword = () => (Math.random() + 1).toString(36).substring(2);

  return (
    <Modal
      visible={visible}
      title="Create Student"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="createAttendanceForm">
        <Form.Item
          label="Fullname"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please enter the fullName!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter the email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          initialValue={randomPassword()}
          rules={[
            {
              required: true,
              message: "Please enter the password!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Course"
          name="course"
          rules={[
            {
              required: true,
              message: "Please input the course!",
            },
          ]}
        >
          <Select placeholder={coursePlaceholder}>
            {courses.map((course) => (
              <Option key={`${course._id}`} value={course._id}>
                {course.courseName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Batch"
          name="batch"
          initialValue={new Date().getFullYear().toString()}
          rules={[
            {
              required: true,
              message: "Please enter the batch!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Semester"
          name="semester"
          initialValue={1}
          rules={[
            {
              required: true,
              message: "Please enter the semester!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
}
