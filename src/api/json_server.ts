import axios from "axios";

export const jsonServerInstance = axios.create({
  baseURL: process.env.REACT_APP_JSON_SERVER
});
