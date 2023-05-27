import axios from "axios";

const api: string = process.env.REACT_APP_API + '/verify' || '';

export function verifyEmail(token: string) {
  return axios.post(api, { token });
}

export function resendEmail() {
  return axios.get(api + "/resend");
}