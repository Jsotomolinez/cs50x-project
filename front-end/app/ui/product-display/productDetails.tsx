'use client'


import Image from "next/image";
import { useState } from "react";

import { CartItem, ProductInfo } from "@/app/definitons/general";

import styles from './productDetails.module.css'
import { addItemToCart } from "@/app/logic/cart";
import { AddToCart, Quantity } from "../buttons/buttons";

export default function ProductDetails({productInfo}: {productInfo: ProductInfo}) {

    const [quantity, setQuantity] = useState(1);
    const [changed, setChanged] = useState(false);
  
    const handleIncrement = (action: string) => {
      if (action === "increment") {
        setQuantity(quantity + 1);
        setChanged(true);
      } else if (action === "decrement") {
        if (quantity === 0) {
          return;
        }
        setQuantity(quantity - 1);
        }
    };

    const addItem = () => {
            const cartItem: CartItem = {
                id: productInfo.id,
                quantity: quantity
            }
            addItemToCart({ cartItem })
        }

    

  return (
    <>
    <div className={styles.conteiner}>
      <div className={styles.image_conteiner}>
        <Image
          className={styles.image}
          src={productInfo.image}
          alt={productInfo.name}
          height={100}
          width={100}
        />
      </div>
      <div className={styles.info_conteiner}>
        <div className={styles.details}>
          <h2>{productInfo.name}</h2>
          <p>{productInfo.description}</p>
          <h3>{productInfo.brand}</h3>
          <h4>{productInfo.department} - {productInfo.line}</h4>
          <span>{productInfo.price} $</span>
        </div>
        <div className={styles.buttons}>
        <Quantity 
          action={handleIncrement}
          quantity={quantity}
          changed={changed}
        />
        <AddToCart
          action={addItem}
        />
        </div>
      </div>
    </div>
    </>
  )
}