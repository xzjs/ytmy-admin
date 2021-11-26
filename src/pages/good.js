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
import React, { useEffect, useState } from "react";
import "./good.css";
import {
  LoadingOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {request} from "../utils/request";

function Good() {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    request.get("/goods").then((res) => {
      setGoods(res.data);
    });
  });

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
          <a
            onClick={() => {
              onEdit(ID);
            }}
          >
            修改
          </a>
          <a
            onClick={() => {
              onDelete(ID);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];
  const [error, setError] = useState({ tableError: "", formError: "" });
  const [updateCount, setUpdateCount] = useState(0);
  const normFile = (info) => {
    if (info.file.status == "done") {
      return info.file.response.key;
    }
  };
  const getToken = () => {
    return request.get("/api/uptoken").then((res) => {
      return res.data;
    });
  };
  const handleChange = (info) => {
    if (info.file.status == "done") {
      setGood({ img: info.file.response.key });
    }
  };
  const onFinish = (values) => {
    request
      .post("/api/goods", values)
      .then((res) => {
        form.resetFields();
        setVisible(false);
        setUpdateCount(updateCount + 1);
      })
      .catch((err) => {
        setError({ formError: err.response.data });
      });
  };
  const { confirm } = Modal;

  const onDelete = (id) => {
    confirm({
      title: "是否删除商品",
      icon: <ExclamationCircleOutlined />,
      okText: "是",
      okType: "danger",
      cancelText: "点错了",
      onOk() {
        request
          .delete("/api/goods/" + id)
          .then((res) => {
            setUpdateCount(updateCount + 1);
          })
          .catch((err) => {
            setError({ tableError: err.response.data });
          });
      },
      onCancel() {},
    });
  };

  const onEdit = (id) => {};

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
      {error.tableError ? (
        <Alert message={error.tableError} type="error" showIcon closable />
      ) : (
        ""
      )}
      <Table columns={columns} dataSource={goods} />
      <Modal visible={visible} footer={null} closable={false}>
        {error.formError ? (
          <Alert message="Error" type="error" showIcon closable />
        ) : (
          ""
        )}
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
            <Space size="middle">
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
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Good;
