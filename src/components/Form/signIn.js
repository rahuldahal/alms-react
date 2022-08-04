import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";

export default function SignInForm({ visible, setMakeModalVisible, onCancel }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) {
      console.log("runs...");
      setConfirmLoading(false);
    }
  }, [visible]);

  const handleSignIn = async (values) => {
    console.log("Sign In:", values);

    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      form.resetFields();
      await handleSignIn(values);
      setMakeModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Sign In"
      okText="Sign In"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="signInForm"
        initialValues={{
          email: "bharat@email.com",
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
