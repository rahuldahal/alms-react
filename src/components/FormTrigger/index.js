import { Button } from "antd";
import React, { useState } from "react";
import SignInForm from "../Form/signIn";

export default function FormTrigger({ size, triggers, className, children }) {
  const [makeModalVisible, setMakeModalVisible] = useState(false);

  const ctaClickHandler = () => setMakeModalVisible(true);

  const handleSignUp = async (values) => {
    console.log("Sign Up:", values);

    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });
  };

  return (
    <>
      <Button
        type="primary"
        size={size}
        className={className}
        onClick={ctaClickHandler}
      >
        {children}
      </Button>

      <SignInForm
        visible={makeModalVisible}
        setMakeModalVisible={setMakeModalVisible}
        onCancel={() => {
          setMakeModalVisible(false);
        }}
      />
    </>
  );
}
