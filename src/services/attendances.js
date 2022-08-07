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