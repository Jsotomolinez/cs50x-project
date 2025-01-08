'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Card from "../ui/product-display/card";
import { ProductInfo } from "../definitons/general";
import config from '@/app/config.json'

import styles from './page.module.css'


export default function Products() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const query = searchParams.get('query');
  const [productsInfo, setProductsInfo] = useState<ProductInfo[] | null>(null);

  useEffect(() => {
      const fetchProductInfo = async () => {
          const response = await fetch(`${config.rootURL}/${category}/products/?id=${query}`);
          const info: ProductInfo[] = await response.json();
          setProductsInfo(info);
      };
      fetchProductInfo();
    }, [category, query]);
    
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
