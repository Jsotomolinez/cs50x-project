import { CartItem } from "../definitons/general";

export function getItemsFromCart() {
  const cartItems = localStorage.getItem('cartItems');
  
  if (cartItems) {
      return JSON.parse(cartItems) as CartItem[];
    }
    return null;
}

export function addItemToCart({ cartItem }: { cartItem: CartItem }) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
  const hasItem = cartItems.some((item: CartItem) => item.id === cartItem.id)
  if (hasItem) {
    cartItems = cartItems.filter(item => item.id !== cartItem.id);
  }
  cartItems.push(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export function removeItemFromCart({ cartItem }: { cartItem: CartItem}) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
  const updatedCartItems = cartItems.filter(item => item.id !== cartItem.id);
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
}