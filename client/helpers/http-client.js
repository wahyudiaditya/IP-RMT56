import axios from "axios";

export const myRecMovie = axios.create({
  baseURL: "http://localhost:3000/",
});
