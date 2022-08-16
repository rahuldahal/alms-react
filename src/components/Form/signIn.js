import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { signIn } from "../../services/user";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { dashboardDefaults } from "../../constants/urls";
import { getTeacherByUserId } from "../../services/teachers";

export default function SignInForm({ visible, setMakeModalVisible, onCancel }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!visible) {
      console.log("runs...");
      setConfirmLoading(false);
    }
  }, [visible]);

  const handleSignIn = async (values) => {
    const { email, password } = values;

    const { status, data } = await signIn({ email, password });
    if (status === 202) {
      const { role, _id: userId } = data;
      // if(role === 'PRINCIPAL'){
      //   const { _id:teacherId } = await getTeacherByUserId({userId });
      //   setAuth({ isAuthenticated: true, role, userId, teacherId });
      // }
      if (role === "TEACHER") {
        const { teacher } = await getTeacherByUserId({ userId });
        const { _id: teacherId } = teacher;

        setAuth({ isAuthenticated: true, role, userId, teacherId });
      }
      // if(role === 'STUDENT'){
      //   const { _id:teacherId } = await getTeacherByUserId({userId });
      //   setAuth({ isAuthenticated: true, role, userId, teacherId });
      // }
      console.log("redirecting to dashboard");
      navigate(dashboardDefaults[role], { replace: true });
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
