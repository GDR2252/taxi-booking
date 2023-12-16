import axios from "axios";

let env = "http://localhost:5000";

export const axiosAuthInstance = axios.create({
  baseURL: `${env}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
