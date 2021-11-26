import axios from "axios";
import { store } from "../store/store";
import { setLogin } from "../store/action";

const request = axios.create({
  baseURL: "/api/",
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status == 401) {
      store.dispatch(setLogin(false));
    }
    return Promise.reject(error);
  }
);

export { request };
