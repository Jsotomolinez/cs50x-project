import config from "@/app/config.json";
import { CartItem, CartProductInfo, ProductInfo } from "../definitons/general";
import { fetchProductsById } from "./fetching";


export function getItemsFromCart() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        return JSON.parse(cartItems) as CartItem[];
    }
    return null;
}

export function addItemToCart({ cartItem }: { cartItem: CartItem }) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
  cartItems.push(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export function removeItemFromCart({ cartItem }: { cartItem: CartItem }) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
  const updatedCartItems = cartItems.filter(item => item.id !== cartItem.id);
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
}

export function removeItemsFromCart() {
  localStorage.clear()
}

export function changeQuantityFromCart(cartItemId: number, action: 'increment' | 'decrement') {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
  const updatedCartItems = cartItems.map(item => {
    if (item.id === cartItemId) {
      if (action === 'increment') {
        return { ...item, quantity: item.quantity + 1 };
      } else if (action === 'decrement' && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
    }
    return item;
  });
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  return updatedCartItems;
}

export async function getInfoForMessage() {
  const cartItems = getItemsFromCart();
  const products = await fetchProductsById();
  const productsInfo: CartProductInfo[] = [];
  
  if (!products) {
    return;
  }
  products.forEach((product: ProductInfo) => {
    const item = cartItems?.find(cartItem => cartItem.id === product.id);
    if (item) {
      const tmp: CartProductInfo = {
        id: product.id,
        name: product.name,
        price: product.price,
        line: product.line,
        quantity: item.quantity
      }
      productsInfo.push(tmp);
    }
  });
  return productsInfo;
}

export async function buildMessage({role}: {role: 'buy' | 'wishlist'}) {
  let message = '';
  if (role === 'buy'){
    message += `Hola ${config.name} Quiero hacer la siguiente compra:%0A`;
  } else {
    message += `Hola, hice esta wishlist, mirala:%0A`;
  }

  const items: CartProductInfo[] | undefined = await getInfoForMessage();
  let total = 0;
  if (!items) {
    return;
  }
  items.forEach((item) => {
    message += `- ${item.name} (${item.line}) -> ${item.quantity} x ${item.price} $%0A`;
    total += item.price * item.quantity;
  });
  message += `%0ATotal: ${total.toFixed(2)} $`;
  return message;
}