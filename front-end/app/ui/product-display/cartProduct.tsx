import Image from "next/image"

import { RemoveButton } from "../buttons/buttons"

import { ProductInfo, CartItem } from "@/app/definitons/general"

import styles from './cartProduct.module.css'

export default function CartProduct (
  {productInfo, cartItem}:
  {productInfo: ProductInfo, cartItem: CartItem}
) {

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
      <RemoveButton cartItem={cartItem}/>
    </div>
  )
}