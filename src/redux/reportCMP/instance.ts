import axios from "axios";
import { baseUrl } from "./constants";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
