"use client";

import { UseProductContext } from "@/context/product-context";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, InputNumber, Spin } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateProduct({ params: { productid } }: any) {
  const context = UseProductContext();
  const [form] = Form.useForm();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if(context?.products){
      const filterProduct = context.products.filter(
        (item) => item.id == productid[0]
      );
      onFill(filterProduct);
      setIsloading(false);
    }
    
  }, []);

  const onFinish: FormProps["onFinish"] = (values) => {
    let cloneProduct = context?.products;
    cloneProduct![productid[1]].name = values.productName;
    cloneProduct![productid[1]].price = values.price;
    cloneProduct![productid[1]].category = values.category;

    setIsloading(true)
    router.push("/");
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onFill(filterProduct: any) {
    if (filterProduct) {
      form.setFieldsValue({
        category: filterProduct[0].category,
        productName: filterProduct[0].name,
        price: filterProduct[0].price,
      });
    }
  }

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
    <>
      <div
        style={{
          // backgroundColor: 'olive',
          width: "400px",
          margin: "auto",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Edit Product</h2>
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
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
