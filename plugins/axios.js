import axios from "axios";

const $axios = axios.create({
  // baseURL: "https://asali-munafaa-be.vercel.app",
  // baseURL: "https://asali-munaafa-be.vercel.app/"
  // baseURL: "http://localhost:8080",
  baseURL: "https://asali-munaafa-be.vercel.app",
});

$axios.interceptors.request.use(
  async (config) => {
    const accessToken = sessionStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response.data;
  },
  (error) => {
    // Handle error response
    return Promise.reject(error);
  }
);

export default $axios;
