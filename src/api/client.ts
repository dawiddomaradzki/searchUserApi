import axios from "axios";

export const restApiClient = axios.create({
  baseURL: "https://randomuser.me/",
});
