import axios from "axios";

const instance = axios.create({
  // baseURL: "https://iproject.kufaii.xyz",
  baseURL: "http://localhost:3000",
});

export default instance;
