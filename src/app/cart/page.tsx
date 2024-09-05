"use client";

import { UseProductContext } from "@/context/product-context";
import Link from "next/link";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, List, Space, Button, Spin, Image } from "antd";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const context = UseProductContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsloading] = useState(true);
  let price = 0;
  let deliveryCharges = 250;
  let tax = 100;

  useEffect(() => {
    calculateTotal();
    setIsloading(false);
  }, [context?.cart]);

  const data = context?.cart;

  function calculateTotal() {
    if (context?.cart) {
      price = 0;
      context.cart.forEach((porduct) => {
        price += porduct.totalPrice!;
      });
      price += deliveryCharges + tax;

      setTotalPrice(price);
    }
  }

  return (
    <>
      {isLoading ? (
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
        <div>
          <h2
            style={{
              textAlign: "center",
            }}
          >
            Cart
          </h2>
          <List
            style={{
              width: "70%",
              margin: "auto",
              borderBottom: "1px solid lightgrey",
            }}
            itemLayout="vertical"
            size="small"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
              key={index}
                actions={[
                  <DeleteOutlined
                  key={index}
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => {
                      context?.deleteCartItem(index);
                    }}
                  />,
                ]}
                extra={
                  <Image
                    key={index}
                    width={172}
                    alt="logo"
                    src="https://cdn.thewirecutter.com/wp-content/media/2024/05/running-shoes-2048px-9718.jpg"
                  />
                }
              >
                <List.Item.Meta
                  title={<a>{item.name}</a>}
                  description={`Price : ${item.price} x ${item.quantity} = ${
                    Number(item.price) * Number(item.quantity)
                  }`}
                />
                {`Quantity : ${item.quantity}`}
              </List.Item>
            )}
          />

          {context?.cart.length! >= 1 ? (
            <div
              style={{
                width: "70%",
                margin: "auto",
                // backgroundColor : 'lightgrey',
                // textAlign : 'right'
              }}
            >
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>
                  Delivery Charges :
                </span>{" "}
                {deliveryCharges}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>Tax :</span> {tax}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>Total :</span> {totalPrice}
              </p>
              <Button type="primary">Order Now</Button>
            </div>
          ) : (
            <> </>
          )}
        </div>
      )}
    </>
  );
}
