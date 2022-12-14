import config from "../config";
import axios from "axios";
import { getISODateOnly } from "../utils/date";

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
  date = date || getISODateOnly();
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

export async function getAttendancesOfStudent({ student, date, subject }) {
  date = date || getISODateOnly();
  try {
    const url = {
      base: `${apiBaseURL}/attendances/students/${student}?date=${date}`,
      get subjectIncluded() {
        return `${this.base}&subject=${subject}`;
      }, // REF: https://stackoverflow.com/a/42437104/11416157
    };
    const { data } = await axios({
      url: subject ? url.subjectIncluded : url.base,
      method: "get",
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function getAttendancesOfMonth({ student, date, subject }) {
  date = date || getISODateOnly();
  try {
    const { data } = await axios({
      url: `${apiBaseURL}/attendances/my-attendance?student=${student}&subject=${subject}&date=${date}`,
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

export async function toggleAttendance({ _id, isPresent }) {
  try {
    const res = await axios({
      url: `${apiBaseURL}/attendances/${_id}`,
      method: "patch",
      withCredentials: true,
      data: {
        isPresent: !isPresent,
      },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}
