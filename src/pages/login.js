import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import axios from "axios";
import { useState } from "react";

function Login(props) {
  const [msg, setMsg] = useState("");
  const onFinish = (values) => {
    axios
      .post("/api/admin/login", values)
      .then((res) => {
        props.onSetIsLogin(true);
      })
      .catch((err) => {
        setMsg(err.response.data);
      });
  };
  let errorAlert = "";
  if (msg != "") {
    errorAlert = <Alert message={msg} type="error" showIcon closable />;
  }

  return (
    <div className="main">
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        {errorAlert}
        <Form.Item
          name="name"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="pwd"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
