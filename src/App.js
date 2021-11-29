import { useState } from "react";
import "./App.css";
import DashBoard from "./pages/dashboard";
import Login from "./pages/login";
import { store } from "./store/store";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const handleChange = () => {
    setIsLogin(store.getState().isLogin);
  };
  store.subscribe(handleChange);
  return (
    <div className="App">
      {isLogin ? <DashBoard></DashBoard> : <Login></Login>}
    </div>
  );
}

export default App;
