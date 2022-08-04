import config from "../config";
import axios from "axios";

const { apiBaseURL } = config;

export async function signIn({ email, password }) {
  try {
    const { status } = await axios({
      url: `${apiBaseURL}/users/login`,
      method: "post",
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
