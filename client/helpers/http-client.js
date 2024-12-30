import axios from "axios";

export const myRecMovie = axios.create({
  baseURL: "https://localhost:3000/",
});
