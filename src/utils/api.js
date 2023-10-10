import axios from "axios";
import Cookies from "js-cookie";
import { useSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = Cookies.get('access-token');

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
