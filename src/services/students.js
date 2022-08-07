import config from "../config";
import axios from "axios";

const { apiBaseURL } = config;

export async function getAllStudents() {
  try {
    const { data } = await axios({
      url: `${apiBaseURL}/students?populateBy=courseId%20userId`,
      method: "get",
      withCredentials: true,
    });
    
    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}
