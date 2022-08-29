import React, { useEffect, useState } from "react";
import { Checkbox, DatePicker, Form, Modal, Select } from "antd";
import { signIn } from "../../services/user";
import { getAllSubjects } from "../../services/subjects";
import { getAllTeachers } from "../../services/teachers";
import { getAllStudents } from "../../services/students";
import { createAttendance } from "../../services/attendances";

const { Option } = Select;

export default function CreateAttendanceForm({
  visible,
  setMakeModalVisible,
  onCancel,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [subjectPlaceholder, setSubjectPlaceholder] = useState(
    "Loading Subjects..."
  );
  const [studentPlaceholder, setStudentPlaceholder] = useState(
    "Loading Students..."
  );
  const [teacherPlaceholder, setTeacherPlaceholder] = useState(
    "Loading Teachers..."
  );

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (!visible) {
      console.log("create attendance...");
      setConfirmLoading(false);
    }
  }, [visible]);

  useEffect(
    () => async () => {
      const { subjects } = await getAllSubjects();
      const { teachers } = await getAllTeachers();
      const { students } = await getAllStudents();

      setSubjects(subjects);
      setTeachers(teachers);
      setStudents(students);
    },
    []
  );

  useEffect(() => {
    if (!subjects.length || !teachers.length || !students.length) {
      return;
    }

    setSubjectPlaceholder("Choose the Subject");
    setTeacherPlaceholder("Choose the Teacher");
    setStudentPlaceholder("Choose the Student");
  }, [subjects]);

  const handleAttendanceCreation = async (values) => {
    const { subject, teacher, student, isPresent, date } = values;
    console.log(values);

    const { status } = await createAttendance({
      subject,
      teacher,
      student,
      isPresent: !!isPresent,
      date: new Date(date).toISOString().split("T")[0],
    });
    console.log(status);

    // TODO: update the attendance table after successful creation.
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      const date = new Date(values.date).toISOString();
      const isPresent = !!values.isPresent;
      console.log({ date, isPresent });
      form.resetFields();
      await handleAttendanceCreation(values);
      setMakeModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create Attendance"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="createAttendanceForm">
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

        <Form.Item
          label="Teacher"
          name="teacher"
          rules={[
            {
              required: true,
              message: "Please input the teacher!",
            },
          ]}
        >
          <Select placeholder={teacherPlaceholder}>
            {teachers.map((teacher) => (
              <Option key={`${teacher._id}`} value={teacher._id}>
                {teacher.user.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Student"
          name="student"
          rules={[
            {
              required: true,
              message: "Please input the student!",
            },
          ]}
        >
          <Select placeholder={studentPlaceholder}>
            {students.map((student) => (
              <Option key={`${student._id}`} value={student._id}>
                {student.user.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="isPresent" valuePropName="checked" className="w-100">
          <Checkbox>Is Present</Checkbox>
        </Form.Item>

        <Form.Item label="Date" name="date" className="w-100">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
}
