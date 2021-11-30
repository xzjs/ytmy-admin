import {
  Table,
  Space,
  Image,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  InputNumber,
  Alert,
  Badge,
  Tabs,
} from "antd";
import { useEffect, useState } from "react";
import { request } from "../utils/request";
import { baseURL } from "../utils/img";

function Order() {
  const [orders, setOrders] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);
  const [error, setError] = useState("");
  const [query, setQuery] = useState({ status: 0 });
  const { TabPane } = Tabs;

  useEffect(() => {
    request.get("/orders", { params: query }).then((res) => {
      setOrders(res.data);
    });
  }, [updateCount, query]);

  const columns = [
    {
      title: "订单号",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "顾客名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "总价",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status, item) => {
        return status == 1 ? (
          <span>
            <Badge status="success" />
            已完成
          </span>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              updateStatus(item);
            }}
          >
            完成
          </Button>
        );
      },
    },
  ];
  const expandedRowRender = (record, index, indent, expanded) => {
    const columns = [
      { title: "商品名", dataIndex: ["good", "name"], key: "good.name" },
      { title: "数量", dataIndex: "num", key: "num" },
    ];
    const data = record.carts;
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const updateStatus = (item) => {
    item.status = 1;
    request
      .put("/orders/" + item.ID, item)
      .then((res) => {
        setUpdateCount(updateCount + 1);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const onChange = (key) => {
    setQuery({ status: key });
  };

  return (
    <div>
      {error && <Alert message={error} type="error" showIcon closable />}
      <Tabs defaultActiveKey="0" onChange={onChange}>
        <TabPane tab="未完成" key="0"></TabPane>
        <TabPane tab="已完成" key="1"></TabPane>
      </Tabs>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={orders}
      />
    </div>
  );
}

export default Order;
