'use client';


import Image from "next/image";
import { useState } from "react";

import { ProductInfo } from '../../definitons/products';

import styles from "./card.module.css";

export default function Card({productInfo}: {productInfo: ProductInfo}) {
    const size = 100;
    const [quantity, setQuantity] = useState(0);

    const handleIncrement = (action: string) => {
        if (action === "increment") {
            setQuantity(quantity + 1);
        } else if (action === "decrement") {
            if (quantity === 0) {
                return;
            }
            setQuantity(quantity - 1);
        }
    };

    
    return (
        <div className={styles.card}>
            <div className={styles.image_container}>
                <Image
                    className={styles.image}
                    src={productInfo.image}
                    alt={productInfo.name}
                    width={size}
                    height={size}
                />
            </div>
            <div className={styles.details}>
                <h3>{productInfo.name}</h3>
                {/* <p>{productInfo.description}</p> */}
                <p>{productInfo.price} $</p>
            </div>
            <div className={styles.buttons}>
                <div className={styles.quantity}>
                    <button onClick={()=> {handleIncrement('decrement')}}>-</button>
                    <span>{quantity === 0 ? '': quantity}</span>
                    <button onClick={()=> {handleIncrement('increment')}}>+</button>
                </div>
                <button
                className={styles.add_to_cart}
                >🛒</button>
            </div>
        </div>
    );
}
