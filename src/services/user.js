import config from "../config";
import axios from "axios";

const { apiBaseURL } = config;

export async function signOut() {
  try {
    const { status } = await axios({
      url: `${apiBaseURL}/users/signOut`,
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
    const res = await axios({
      url: `${apiBaseURL}/users/login`,
      method: "post",
      withCredentials: true,
      data: {
        email,
        password,
      },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function getAuthStatus() {
  try {
    const res = await axios({
      url: `${apiBaseURL}/users/checkAuth`,
      method: "get",
      withCredentials: true,
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}
