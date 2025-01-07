'use client'

import { useState, useEffect } from "react";
// import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";

import { ProductInfo } from "../definitons/general";
import config from '../config.json';

// import styles from './page.module.css'
import ProductDetails from "../ui/product-display/productDetails";

export default function Page() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId')
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);

  useEffect(() => {
    if (productId) {
      const fetchProductInfo = async () => {
        const response = await fetch(`${config.rootURL}/products/get_by_id/${productId}`);
        const info: ProductInfo = await response.json();
        setProductInfo(info);
      };
      fetchProductInfo();
    }
  }, [productId]);

  return (
    <main>
      {
        productInfo ? (
          <main>
            <ProductDetails
              productInfo={productInfo}
            />
          </main>
        ) : (
          <p>Loading...</p>
        )
      }
    </main>
  );
}