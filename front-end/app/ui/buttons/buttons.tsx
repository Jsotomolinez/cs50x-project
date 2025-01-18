import { CartItem } from "@/app/definitons/general";
import config from '@/app/config.json';

import { buildMessage, removeItemFromCart, removeItemsFromCart } from "@/app/logic/cart";

import styles from './buttons.module.css'
import { CartIcon, DeleteIcon, MinusIcon, PlusIcon } from "../icons/icons";

export function RemoveButton (
  { cartItem, action, size }:
  { cartItem: CartItem,
    action: () => void,
    size: number
  }
) {
  return (
    <div className={styles.remove}>
      <button
        onClick={()=> {
          removeItemFromCart({ cartItem });
          action();
        }}
      >
        <DeleteIcon size={size}/>
      </button>
    </div>
  )
}

export function CleanStorage(
  {action}: {action: () => void}
) {
  return (

    <div className={styles.remove}>
    <button onClick={() => {
      removeItemsFromCart();
      action();
    }}>
      <h3>Cancel</h3>
    </button>
  </div>
  )
}

export function Quantity (
  { action, quantity, changed }: {
    action: (type: 'increment' | 'decrement') => void,
    quantity: number,
    changed: boolean
  }
) {
  return (
    <div className={styles.quantity}>
      <button
        id={styles.minus_button}
        onClick={() => { action('decrement') }}>
        <MinusIcon size={1}/>
      </button>
      <span>{changed ? quantity : ''}</span>
      <button
        id={styles.plus_button}
        onClick={() => {action('increment') }}>
        <PlusIcon size={1}/>
      </button>
    </div>
  )
}

export function AddToCart (
  {action}: { action: () => void }
) {
  return (
    <button
      className={styles.add_to_cart}
      onClick={action}
    >
    <CartIcon size={2}/>
    </button>
  )
}


export function BuyProducts(
  {action}: {action: () => void}
) {
  let message: string | undefined;
  return (

    <div className={styles.remove}>
    <button onClick={async () => {
      message = await buildMessage();
      removeItemsFromCart();
      action();
      console.log(`message= ${message}, `);
      window.open(`https://wa.me/${config.toPhone}?text=${message}`, '_blank');
    }}>
      <h3>Buy products</h3>
    </button>
  </div>
  )
}