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
