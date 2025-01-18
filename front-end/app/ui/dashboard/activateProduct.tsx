'use client'

import { useState } from 'react';
import styles from './forms.module.css';
import config from '../../config.json';

export default function ActivateProduct() {
  const [productId, setProductId] = useState<number | ''>('');
  const [activado, setActivado] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(Number(e.target.value));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivado(e.target.value === 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productId === '') {
      console.error('Product ID is required');
      return;
    }

    const response = await fetch(`${config.rootURL}/products/${productId}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activado }),
    });

    if (response.ok) {
      // Manejar la respuesta exitosa
      console.log('Producto actualizado exitosamente');
    } else {
      // Manejar el error
      console.error('Error al actualizar el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Activar/Desactivar producto</h2>
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
      <div className={styles.formGroup}>
        <label>Activado</label>
        <div>
          <input
            type="radio"
            id="activadoTrue"
            name="activado"
            value="true"
            checked={activado === true}
            onChange={handleRadioChange}
          />
          <label htmlFor="activadoTrue">Sí</label>
        </div>
        <div>
          <input
            type="radio"
            id="activadoFalse"
            name="activado"
            value="false"
            checked={activado === false}
            onChange={handleRadioChange}
          />
          <label htmlFor="activadoFalse">No</label>
        </div>
      </div>
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}