"use client";

import { UseProductContext } from "@/context/product-context";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Flex } from "antd";
import { useRouter } from "next/navigation";

export default function ProductCard() {
  const context = UseProductContext();
  const router = useRouter();

  function card() {
    return context?.products.map((product, id) => {
      const actions: React.ReactNode[] = [
        <EditOutlined key="edit" onClick={() => {
          router.push(`/update-product/${product.id}/${id}`)
        }} />,
        <ShoppingCartOutlined
          key="shopping"
          style={{ color: "blue" }}
          onClick={() => {
            context.updateCart(product);
          }}
        />,
        <DeleteOutlined
          key="delete"
          style={{ color: "red" }}
          onClick={() => {
            context.deleteProduct(id);
          }}
        />,
      ];

      return (
        <Card actions={actions} style={{ width: 300 }} key={id}>
          <Card.Meta
            avatar={<Avatar />}
            title={product.name}
            description={
              <>
                <p>Category : {product.category}</p>
                <p>Price : RS {product.price}</p>
              </>
            }
          />
        </Card>
      );
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {card()}
      </div>
    </>
  );
}
