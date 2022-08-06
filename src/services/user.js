import config from "../config";
import axios from "axios";

const { apiBaseURL } = config;

export async function hasAccessToken() {
  try {
    const { status } = await axios({
      url: `${apiBaseURL}/users/auth`,
      method: "get",
      withCredentials: true,
    });

    return status === 200;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function signIn({ email, password }) {
  try {
    const { status } = await axios({
      url: `${apiBaseURL}/users/login`,
      method: "post",
      withCredentials: true,
      data: {
        email,
        password,
      },
    });

    return status;
  } catch (e) {
    console.error(e);
    return e;
  }
}
