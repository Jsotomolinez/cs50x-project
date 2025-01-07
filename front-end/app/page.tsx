'use client';

import { useEffect, useState } from "react";
import Card from "./ui/product-display/card";
import { ProductInfo } from "./definitons/general";

import styles from './page.module.css'


export default function Home() {
  const [productsInfo, setProductsInfo] = useState<ProductInfo[] | null>(null);

  useEffect(() => {
      const fetchProductInfo = async () => {
          const response = await fetch('http://127.0.0.1:8000/products');
          const info: ProductInfo[] = await response.json();
          setProductsInfo(info);
      };
      fetchProductInfo();
  }, []);


  return (
    <main>
      {productsInfo ? (
        <div className={styles.product_grid}>
          {productsInfo.map((product) => (
            <Card key={product.id} productInfo={product}/>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
