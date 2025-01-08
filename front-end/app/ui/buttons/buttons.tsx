import { CartItem } from "@/app/definitons/general";

import { removeItemFromCart } from "@/app/logic/cart";

import styles from './buttons.module.css'

export function RemoveButton ({ cartItem }: { cartItem: CartItem}) {
  return (
    <div className={styles.remove}>
      <button
        className={styles.remove_button}
        onClick={()=> {removeItemFromCart({ cartItem })}}
      >
        ❌
      </button>
    </div>
  )
}