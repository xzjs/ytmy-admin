import { useState } from "react";
import "./App.css";
import DashBoard from "./pages/dashboard";
import Login from "./pages/login";
import {
  AxiosProvider,
  Request,
  Get,
  Delete,
  Head,
  Post,
  Put,
  Patch,
  withAxios,
} from "react-axios";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  let content;
  if (isLogin) {
    content = <DashBoard></DashBoard>;
  } else {
    content = <Login onSetIsLogin={setIsLogin}></Login>;
  }
  const axiosInstance = axios.create({
    baseURL: "api/",
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error)
      if (error.response.status == 401) {
        setIsLogin(false);
      }
      return Promise.reject(error);
    }
  );
  return (
    <div className="App">
      <AxiosProvider instance={axiosInstance}>{content}</AxiosProvider>
    </div>
  );
}

export default App;
