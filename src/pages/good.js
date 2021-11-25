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
} from "antd";
import { Get } from "react-axios";
import React, { useState } from "react";
import "./good.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function Good() {
  const [visible, setVisible] = useState(false);
  const [good, setGood] = useState({
    ID: 0,
    name: "",
    img: "",
    price: 0,
    description: "",
  });
  const [form] = Form.useForm();
  const columns = [
    {
      title: "商品名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "图片",
      dataIndex: "img",
      key: "img",
      render: (img) => <Image width={200} src={img} />,
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "描述",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "ID",
      render: (ID) => (
        <Space size="middle">
          <a>修改</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  const [error, setError] = useState("");
  const normFile = (info) => {
    if (info.file.status == "done") {
      return info.file.response.key;
    }
  };
  const getToken = () => {
    return axios.get("/api/uptoken").then((res) => {
      return res.data;
    });
  };
  const handleChange = (info) => {
    if (info.file.status == "done") {
      setGood({ img: info.file.response.key });
    }
  };
  const onFinish = (values) => {
    axios
      .post("/api/goods", values)
      .then((res) => {
        form.resetFields();
        setVisible(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div>
      <Button
        type="primary"
        className="button"
        size="large"
        onClick={() => {
          setVisible(true);
        }}
      >
        添加商品
      </Button>
      <Get url="/goods">
        {(error, response, isLoading, onReload) => {
          if (response !== null) {
            return <Table columns={columns} dataSource={response.data} />;
          }
          return <div>Default message before request is made.</div>;
        }}
      </Get>
      <Modal visible={visible} footer={null} closable={false}>
        {error ? <Alert message="Error" type="error" showIcon /> : ""}
        <Form onFinish={onFinish}>
          <Form.Item name="ID"></Form.Item>
          <Form.Item
            label="商品名"
            name="name"
            rules={[{ required: true, message: "请输入商品名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品图片"
            name="img"
            valuePropName="img"
            getValueFromEvent={normFile}
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              action="https://upload.qiniup.com"
              data={getToken}
              onChange={handleChange}
            >
              <div>
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="price"
            rules={[{ required: true, message: "请输入价格" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="商品简介"
            name="description"
            rules={[{ required: true, message: "请输入商品简介" }]}
          >
            <Input rows={2} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setVisible(false);
              }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Good;
