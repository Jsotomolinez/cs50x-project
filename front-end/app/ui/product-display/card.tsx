'use client';


import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { ProductInfo, CartItem } from '../../definitons/general';

import { AddToCart, Quantity } from "../buttons/buttons";

import { addItemToCart } from "@/app/logic/cart";

import styles from "./card.module.css";


export default function Card({productInfo}: {productInfo: ProductInfo}) {
    const size = 100;
    const [quantity, setQuantity] = useState(1);
    const [changed, setChanged] = useState(false);


    const handleIncrement = (action: string) => {
        if (action === "increment") {
            setQuantity(quantity + 1);
            setChanged(true);
        } else if (action === "decrement") {
            if (quantity === 0) {
                return;
            }
            setQuantity(quantity - 1);
        }
    };

    const addItem = () => {
        const cartItem: CartItem = {
            id: productInfo.id,
            quantity: quantity
        }
        addItemToCart({ cartItem })
    }

    
    return (
        <div className={styles.card}>
            <div className={styles.image_container}>
                <Link
                className={styles.link}
                href={{
                    pathname: "/product",
                    query: {productId: productInfo.id}
                }}
                >
                <Image
                    className={styles.image}
                    src={productInfo.image}
                    alt={productInfo.name}
                    width={size}
                    height={size}
                    />
                </Link>
            </div>
            <div className={styles.details}>
                <h3>{productInfo.name}</h3>
                <span>{productInfo.line}</span>
                <p>{productInfo.price} $</p>
            </div>
            <div className={styles.buttons}>
                <Quantity 
                  action={handleIncrement}
                  quantity={quantity}
                  changed={changed}
                />
                <AddToCart
                  action={addItem}
                />
            </div>
        </div>
    );
}
