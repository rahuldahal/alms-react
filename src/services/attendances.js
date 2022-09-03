import config from "../config";
import axios from "axios";

const { apiBaseURL } = config;

export async function getAllAttendances() {
  try {
    const { data } = await axios({
      url: `${apiBaseURL}/attendances?populate=all`,
      method: "get",
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function getAttendancesOfSubject({ subject, date }) {
  date = date || new Date().toISOString().split("T")[0];
  try {
    const { data } = await axios({
      url: `${apiBaseURL}/attendances/subjects/${subject}?date=${date}&populate=all`,
      method: "get",
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function createAttendance(values) {
  try {
    const res = await axios({
      url: `${apiBaseURL}/attendances?populate=all`,
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
