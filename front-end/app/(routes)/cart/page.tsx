'use client'

import { useState, useEffect } from "react";

import CartProduct from "../../ui/product-display/cartProduct";
import { BuyProducts, CleanStorage } from "../../ui/buttons/buttons";

import { CartItem, ProductInfo } from "../../definitons/general";
import config from '@/app/config.json'

import { getItemsFromCart } from "../../logic/cart";

import styles from './page.module.css'


export default function ShopCar() {

  const [bought, setBought] = useState(false)
  const [productsInfo, setProductsInfo] = useState<ProductInfo[] | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[] | null>(() => {
    return getItemsFromCart()
  })

  const handleStorageChange = () => {
    const newItems = getItemsFromCart();
    setCartItems(newItems);
  }

  
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
        if (!response.ok) {

            return;
        }
        const info: ProductInfo[] = await response.json();
        setProductsInfo(info);
        
    };
    fetchProductInfo();
}, [query]);

  return (
    <div className={styles.conteiner}>
    {
      productsInfo && (
        productsInfo.map((item) => {
            return (
            <CartProduct
              key={item.id}
              productInfo={item}
              cartItem={cartItems?.find(cartItem => cartItem.id === item.id) ?? {} as CartItem}
              isActive={cartItems?.some(cartItem => cartItem.id === item.id) ?? false}
              action={handleStorageChange}
            />
            );
          })
          )
        }
        {((cartItems?.length === 0 || cartItems === null) && !bought ) &&
          <h1>No products yet</h1>}

        {
          bought && 
          <h1>Thanks for buying!</h1>
        }

    {
      (cartItems && cartItems.length > 0) && 
      <div className={styles.buttons}>
        <CleanStorage
          action = {handleStorageChange}
        />
        <BuyProducts
          action={() => {
            setBought(true);
            handleStorageChange();
          }}
        />
      </div>
    }
    </div>
  );
};