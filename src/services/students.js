import config from "../config";
import axios from "axios";

const { apiBaseURL } = config;

export async function getAllStudents() {
  try {
    const { data } = await axios({
      url: `${apiBaseURL}/students?populateBy=course%20user`, // TODO: accept populateBy as an argument
      method: "get",
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function getStudentsByCourseAndSemester({ course, semester }) {
  try {
    const { data } = await axios({
      url: `${apiBaseURL}/students?course=${course}&semester=${semester}&populateBy=course%20user`,
      method: "get",
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function createStudent(values) {
  try {
    const res = await axios({
      url: `${apiBaseURL}/students`,
      method: "post",
      withCredentials: true,
      data: {
        ...values,
      },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}
