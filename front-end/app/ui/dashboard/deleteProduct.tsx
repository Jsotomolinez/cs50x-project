'use client'

import { useState } from 'react';
import styles from './forms.module.css';
import config from '@/app/config.json'

export default function DeleteProduct() {
  const [productId, setProductId] = useState<number | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productId === '') {
      console.error('Product ID is required');
      return;
    }

    const response = await fetch(`${config.rootURL}/products/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Manejar la respuesta exitosa
      console.log('Producto eliminado exitosamente');
    } else {
      // Manejar el error
      console.error('Error al eliminar el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Eliminar producto</h2>
      <div className={styles.formGroup}>
        <label htmlFor="productId">ID del Producto</label>
        <input
          type="number"
          id="productId"
          name="productId"
          value={productId}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Eliminar Producto</button>
    </form>
  );
}