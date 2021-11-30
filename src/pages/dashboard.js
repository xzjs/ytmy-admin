import { Layout, Menu, Breadcrumb } from "antd";
import "./dashboard.css";
import React, { useState } from "react";
import Good from "./good";
import Order from "./order";

function DashBoard() {
  const { Header, Content, Footer } = Layout;
  const menus = ["商品管理", "订单管理"];
  const [index, setIndex] = useState(0);
  const contents = [<Good />, <Order />];

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
          {menus.map((menu, index) => {
            return (
              <Menu.Item key={index} onClick={() => setIndex(index)}>
                {menu}
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>{contents[index]}</Content>
    </Layout>
  );
}

export default DashBoard;
