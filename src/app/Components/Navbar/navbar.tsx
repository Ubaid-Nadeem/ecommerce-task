"use client"

import { UseProductContext } from "@/context/product-context";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import Link from "next/link";

export default function Navbar() {

  const context = UseProductContext();


  return (
    <div
      style={{
        // backgroundColor: "black",
        // color: "white",
        display: "flex",
        justifyContent: "space-between",
        width: "98%",
        borderBottom : "1px solid lightgrey",
        margin : 'auto'
      }}
    >
      <h2
        style={{
          margin: "15px",
        }}
      >
        eCommerce
      </h2>

      <p  style={{
          margin: "15px",
          cursor : 'pointer'
        }}
       
        >
          <Link href={'/cart'}>
        <Badge count={context?.cart.length}>
          <Avatar shape="square" size="large" />
        </Badge>
        </Link>

      </p>
    </div>
  );
}
