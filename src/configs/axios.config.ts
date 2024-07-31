import axios from "axios";

export const axios_instance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
