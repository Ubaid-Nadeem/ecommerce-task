"use client";

import { useState, createContext, useContext } from "react";

type ProductType = {
  id: string;
  name: string;
  category: string;
  price: number;
};

const allProducts = [
  {
    id: "634d047d-a867-4d25-8f6b-12fe2642397f",
    name: "Iphone Fast Charger",
    category: "Mobile Accessories",
    price: 800,
  },
  {
    id: "f1e81c32-fb90-4be4-862c-90b279183491",
    name: "Nike T Shirt",
    category: "Clothes",
    price: 700,
  },
  {
    id: "5ebb88c0-1506-4851-a76d-5010b9e6734d",
    name: "Air Jordon",
    category: "Shoes",
    price: 80000,
  },
];

type CartType = {
  id: string;
  name: string;
  category: string;
  price: number;
  totalPrice?: number;
  quantity?: number;
};

type ProductContextType = {
  products: ProductType[];
  cart: CartType[];
  updateCart: (e: CartType) => void;
  deleteProduct: (e: number) => void;
  updateProducts: (e: ProductType) => void;
  deleteCartItem: (e: number) => void;
};

const ProductContext = createContext<null | ProductContextType>(null);

export default function ProductContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [products, setProducts] = useState<ProductType[] | []>(allProducts);
  const [cart, setCart] = useState<CartType[] | []>([]);

  function updateCart(product: any) {
    let [filterCart] = cart.filter((item) => item.id == product.id);

    if (filterCart == undefined) {
      (product.quantity = 1),
        (product.totalPrice = product.quantity * product.price);

      setCart([...cart, product]);
    } else {
      filterCart.quantity = filterCart.quantity! + 1;
      filterCart.totalPrice = filterCart.price! * filterCart.quantity!;
    }
  }

  function deleteProduct(index: number) {
    let productClone = [...products];
    productClone.splice(index, 1);
    setProducts(productClone);
  }

  function updateProducts(product: ProductType) {
    setProducts([...products, product]);
  }

  function deleteCartItem(index: number) {
    let cartClone = [...cart];
    cartClone.splice(index, 1);
    setCart(cartClone);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        updateCart,
        deleteProduct,
        updateProducts,
        deleteCartItem,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const UseProductContext = () => useContext(ProductContext);
