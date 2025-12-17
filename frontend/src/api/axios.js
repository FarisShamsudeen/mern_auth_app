import axios from "axios";
// import { store } from "../redux/store";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
// });
//
// instance.interceptors.request.use((config) => {
//   const token = store.getState().auth.accessToken;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
//
// export default instance;

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
});

export default instance;

