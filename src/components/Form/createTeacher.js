import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Space, TimePicker } from "antd";
import { getAllSubjects } from "../../services/subjects";
import { createStudent } from "../../services/students";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function CreateTeacherForm({
  visible,
  setMakeModalVisible,
  onCancel,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [subjectPlaceholder, setSubjectPlaceholder] = useState(
    "Loading Subjects..."
  );
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!visible) {
      console.log("create teacher...");
      setConfirmLoading(false);
    }
  }, [visible]);

  useEffect(
    () => async () => {
      const { subjects } = await getAllSubjects();

      setSubjects(subjects);
    },
    []
  );

  useEffect(() => {
    if (!subjects.length) {
      return;
    }

    setSubjectPlaceholder("Choose the Subject");
  }, [subjects]);

  const handleTeacherCreation = async (values) => {
    // const { fullName, email, password, subject, batch, semester } = values;
    console.log(values);

    // const { status } = await createStudent({
    //   fullName,
    //   email,
    //   password,
    //   subject,
    //   batch,
    //   semester,
    //   role: "STUDENT",
    // });
    // console.log(status);

    // TODO: update the attendance table after successful creation.
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      form.resetFields();
      await handleTeacherCreation(values);
      setMakeModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  const randomPassword = () => (Math.random() + 1).toString(36).substring(2);

  return (
    <Modal
      visible={visible}
      title="Create Teacher"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="createTeacherForm">
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
          label="Subject"
          name="subject"
          rules={[
            {
              required: true,
              message: "Please input the subject!",
            },
          ]}
        >
          <Select placeholder={subjectPlaceholder}>
            {subjects.map((subject) => (
              <Option key={`${subject._id}`} value={subject._id}>
                {subject.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List
          label="Working Hours"
          name="workingHours"
          rules={[
            {
              required: true,
              message: "Please enter the working hours!",
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item {...field} name={[field.name, index]}>
                    <Input placeholder="working hour" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}
