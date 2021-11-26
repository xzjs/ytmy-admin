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
  return (
    <div className="App">
      {isLogin ? (
        <DashBoard></DashBoard>
      ) : (
        <Login onSetIsLogin={setIsLogin}></Login>
      )}
    </div>
  );
}

export default App;
