import React, { useEffect, useRef, useState } from "react";
import { Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import { getStudentsByCourseAndSemester } from "../../services/students";
import {
  createAttendance,
  getAttendancesOfSubject,
} from "../../services/attendances";
import useData from "../../hooks/useData";
import { getTeacherBySubjectId } from "../../services/teachers";
import { getISODateOnly } from "../../utils/date";

const { Option } = Select;

export default function CreateAttendanceForm({
  visible,
  setMakeModalVisible,
  onCancel,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [studentPlaceholder, setStudentPlaceholder] = useState(
    "Loading Students..."
  );
  const [teacherPlaceholder, setTeacherPlaceholder] =
    useState("Loading Teacher...");

  const { data, setData } = useData();

  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const teacherRef = useRef();

  useEffect(() => {
    if (!visible) {
      console.log("create attendance...");
      setConfirmLoading(false);
    }
  }, [visible]);

  useEffect(
    () => async () => {
      const { course, semester } = data;
      const { students } = await getStudentsByCourseAndSemester({
        course,
        semester,
      });

      setStudents(students);
    },
    []
  );

  useEffect(() => {
    if (!students.length || !teacher) {
      return;
    }

    setTeacherPlaceholder("Choose the Teacher");
    setStudentPlaceholder("Choose the Student");
  }, [teacher, students]);

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

    // update the attendance table after successful creation.

    const { attendances } = await getAttendancesOfSubject({
      subject,
      date: new Date(date).toISOString().split("T")[0],
    });

    setData((previousState) => ({ ...previousState, attendances }));
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

  const handleSubjectChange = async (subjectId) => {
    const { teacher } = await getTeacherBySubjectId({ subjectId });
    const { _id, user } = teacher;
    setTeacher({ _id, user });
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
          <Select placeholder="Select a subject" onChange={handleSubjectChange}>
            {data.subjects?.map((subject) => (
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
            <Option value={teacher?._id}>{teacher?.user?.fullName}</Option>
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
