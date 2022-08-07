import config from "../config";
import axios from "axios";

const { apiBaseURL } = config;

export async function getAllSubjects() {
  try {
    const { data } = await axios({
      url: `${apiBaseURL}/subjects`,
      method: "get",
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}
