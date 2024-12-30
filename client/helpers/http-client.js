import axios from "axios";

export const hcApi = axios.create({
  baseURL: "https://localhost:3000/",
});
