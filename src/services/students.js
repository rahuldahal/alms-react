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
