import Image from "next/image"

import { RemoveButton } from "../buttons/buttons"

import { ProductInfo, CartItem } from "@/app/definitons/general"

import styles from './cartProduct.module.css'

export default function CartProduct (
  {productInfo, cartItem, isActive, action, }:
  {productInfo: ProductInfo,
    cartItem: CartItem,
    isActive: boolean
    action: () => void
  }
) {

  if (!isActive) {
    return null;
  }

  return (
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
    <div className={styles.details}>
      <h2>{productInfo.name}</h2>
      <span>{productInfo.department} -- {productInfo.line}</span>
      <p>{productInfo.description}</p>
       <h4>{cartItem.quantity} x {productInfo.price} $ = {(productInfo.price * cartItem.quantity).toFixed(2)} $</h4>
    </div>
    <RemoveButton
      cartItem={cartItem}
      action={action}
      size={2}
      />
    </div>
  )
}