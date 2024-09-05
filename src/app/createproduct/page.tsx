"use client";

import { UseProductContext } from "@/context/product-context";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, InputNumber, Spin } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const context = UseProductContext();
  const [form] = Form.useForm();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(false);
  },[]);

  const onFinish: FormProps["onFinish"] = (values) => {
    let product = {
      id: crypto.randomUUID(),
      name: values.productName,
      category: values.category,
      price: values.price,
    };
    context?.updateProducts(product);
    setIsloading(true)
    router.push("/");
    form.resetFields();
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return isLoading ? (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" />
    </div>
  ) : (
    <div
      style={{
        // backgroundColor: 'olive',
        width: "400px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Create Product</h2>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="productName"
          name="productName"
          rules={[{ required: true, message: "Please input productName!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="category"
          name="category"
          rules={[{ required: true, message: "Please input category!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="price"
          name="price"
          rules={[{ required: true, message: "Please input price!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Upload
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
