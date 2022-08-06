import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { signIn } from "../../services/user";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function SignInForm({ visible, setMakeModalVisible, onCancel }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const {setAuth} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!visible) {
      console.log("runs...");
      setConfirmLoading(false);
    }
  }, [visible]);

  const handleSignIn = async (values) => {
    const { email, password } = values;

    const {status, data} = await signIn({ email, password });
    if (status === 202) {
      const {role} = data;
      console.log("redirecting to dashboard");
      setAuth({isAuthenticated: true, role});
      navigate("/dashboard", {replace: true});
    }
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
