'use client'

import { useState, useEffect } from "react";

import CartProduct from "../ui/product-display/cartProduct";

import { CartItem, ProductInfo } from "../definitons/general";
import config from '@/app/config.json'

import { getItemsFromCart } from "../logic/cart";


import styles from './page.module.css'

export default function ShopCar() {

  const [productsInfo, setProductsInfo] = useState<ProductInfo[] | null>(null)
  const [cartItems, setCardItems] = useState<CartItem[] | null>(() => {
    return getItemsFromCart()
  })

  let query = '?'
  if (cartItems) {
    cartItems.forEach((item) => {
      query += `product_ids=${item.id}&`
      query.slice(0, -1);
    })
}

  useEffect(() => {
    const fetchProductInfo = async () => {
        const response = await fetch(`${config.rootURL}/products/by_ids/${query}`);
        const info: ProductInfo[] = await response.json();
        setProductsInfo(info);
        console.log(info);
    };
    fetchProductInfo();
    console.log(query)
}, [query]);


  return (
    <div className={styles.conteiner}>
    {
      productsInfo ? (
        productsInfo.map((item) => {
          return (
            <CartProduct
              key={item.id}
              productInfo={item}
              cartItem={cartItems?.find(cartItem => cartItem.id === item.id) ?? {} as CartItem}
            />
          );
        })
      ) : (
        <h1>No products yet</h1>
      )
    }
    </div>
  );
};