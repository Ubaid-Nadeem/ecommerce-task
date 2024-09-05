"use client";

import Navbar from "./Components/Navbar/navbar";
import ProductCard from "./Components/ProductCard/productcard";
import { EditOutlined } from "@ant-design/icons";
import { FloatButton, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function Home() {
  const route = useRouter();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(false);
  }, []);

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
      <FloatButton
        shape="circle"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<EditOutlined />}
        onClick={() => {
          route.push("/createproduct");
          setIsloading(true)
        }}
      />
      <Navbar />
      <ProductCard />
    </>
  );
}
