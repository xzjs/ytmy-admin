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
import { request } from "../utils/request";
import { isTSEnumMember } from "@babel/types";
import { baseURL } from "../utils/img";

function Good() {
  const [goods, setGoods] = useState([]);
  const [updateCount, setUpdateCount] = useState([]);
  const [good, setGood] = useState({
    ID: 0,
    name: "",
    img: "",
    price: 0,
    description: "",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    request.get("/goods").then((res) => {
      setGoods(res.data);
    });
  }, [updateCount]);

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
      render: (img) => <Image width={200} src={baseURL + img} />,
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
      render: (ID, item) => (
        <Space size="middle">
          <a
            onClick={() => {
              onEdit(item);
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
  const normFile = (info) => {
    if (info.file.status == "done") {
      return info.file.response.key;
    }
  };
  const getToken = () => {
    return request.get("/uptoken").then((res) => {
      return res.data;
    });
  };
  const handleChange = (info) => {
    if (info.file.status == "done") {
      setGood({ img: info.file.response.key });
    }
  };
  const onFinish = (values) => {
    let promise;
    if (values.ID > 0) {
      promise = request.put("/goods/" + values.ID, values);
    } else {
      promise = request.post("/goods", values);
    }
    promise
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
          .delete("/goods/" + id)
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

  const onEdit = (item) => {
    let imgArr = item.img.split("/");
    let img = imgArr[imgArr.length - 1];
    form.setFieldsValue({
      ID: item.ID,
      name: item.name,
      img: img,
      price: item.price,
      description: item.description,
    });
    setVisible(true);
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
        <Form onFinish={onFinish} form={form}>
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
              showUploadList={false}
              data={getToken}
              onChange={handleChange}
            >
              {form.getFieldValue("img") ? (
                <img className="img"  src={baseURL + form.getFieldValue("img")} alt="" />
              ) : (
                <div>
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
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
