import config from '@/app/config.json'
import { ProductInfo } from '../definitons/general';

import { getItemsFromCart } from "./cart";

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

export
 function sendCart(
  { action, info }:
  {
    action: 'transaction' | 'wishlist',
    info: JSON
  }
) {
  const url = `${config.rootURL}/${action}/${info}`;
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(info)
  })
}
  