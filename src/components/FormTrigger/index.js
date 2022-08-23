import { Button, Form } from "antd";
import React, { useState } from "react";
import CreateAttendanceForm from "../Form/createAttendance";
import CreateStudentForm from "../Form/createStudent";
import CreateTeacherForm from "../Form/createTeacher";
import SignInForm from "../Form/signIn";

export default function FormTrigger({
  type,
  size,
  triggers,
  className,
  children,
}) {
  const [makeModalVisible, setMakeModalVisible] = useState(false);

  const ctaClickHandler = () => setMakeModalVisible(true);

  let FormComponent;

  const SignIn = (
    <SignInForm
      visible={makeModalVisible}
      setMakeModalVisible={setMakeModalVisible}
      onCancel={() => {
        setMakeModalVisible(false);
      }}
    />
  );
  const CreateAttendance = (
    <CreateAttendanceForm
      visible={makeModalVisible}
      setMakeModalVisible={setMakeModalVisible}
      onCancel={() => setMakeModalVisible(false)}
    />
  );
  const CreateStudent = (
    <CreateStudentForm
      visible={makeModalVisible}
      setMakeModalVisible={setMakeModalVisible}
      onCancel={() => setMakeModalVisible(false)}
    />
  );
  const CreateTeacher = (
    <CreateTeacherForm
      visible={makeModalVisible}
      setMakeModalVisible={setMakeModalVisible}
      onCancel={() => setMakeModalVisible(false)}
    />
  );

  switch (triggers) {
    case "signIn":
      FormComponent = SignIn;
      break;
    case "createAttendance":
      FormComponent = CreateAttendance;
      break;
    case "createStudent":
      FormComponent = CreateStudent;
      break;
    case "createTeacher":
      FormComponent = CreateTeacher;
      break;
  }

  return (
    <>
      <Button
        type={type || "primary"}
        size={size}
        className={className}
        onClick={ctaClickHandler}
      >
        {children}
      </Button>

      {FormComponent}
    </>
  );
}
