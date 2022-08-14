import config from "../config";
import axios from "axios";

const { apiBaseURL } = config;

export async function getAllTeachers() {
  try {
    const { data } = await axios({
      url: `${apiBaseURL}/teachers?populateBy=user`,
      method: "get",
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function getTeacher({ teacherId }) {
  try {
    const { data } = await axios({
      url: `${apiBaseURL}/teachers/?userId=${teacherId}&populateBy=subjects`,
      method: "get",
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}
