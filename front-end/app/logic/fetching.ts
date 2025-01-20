import config from '@/app/config.json'
import { CartProductInfo, ProductInfo, Transaction_create } from '../definitons/general';

import { getInfoForMessage, getItemsFromCart } from "./cart";

export async function getIdsForQuery() {
  const cartItems = getItemsFromCart();
  let query = '?'
  if (cartItems) {
      cartItems.forEach((item) => {
        query += `product_ids=${item.id}&`
        query.slice(0, -1);
      });
      return query
    };
};

export async function fetchProductsById(): Promise<ProductInfo[] | null> {
    const query =  await getIdsForQuery()
    const response = await fetch(`${config.rootURL}/products/by_ids/${query}`);
    if (!response.ok) {
        return null;
    }
    const info: ProductInfo[] = await response.json();
    return info;
}

export async function sendCart(role: 'buy' | 'wishlist') {
  const products: CartProductInfo[] | undefined = await getInfoForMessage();
  if (products === undefined) {
    return;
  }
  const info = products.map((product) => ({ product_id: product.id, quantity: product.quantity, price: product.price,  }))
  const requestBody: Transaction_create = { role, info: info };
  const url = `${config.rootURL}/transactions/create/`;
  console.log(requestBody)
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log('Error:', errorData);
  }
}
  