'use client'

import { useState } from 'react';
import { ProductInfo } from '@/app/definitons/general';
import styles from './forms.module.css';
import config from '@/app/config.json'

export default function AddProduct() {
  const [product, setProduct] = useState<Omit<ProductInfo, 'id'>>({
    name: '',
    description: '',
    image: '',
    cost: 0,
    price: 0,
    department: '',
    brand: '',
    line: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el producto al backend
    const response = await fetch(`${config.rootURL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      // Manejar la respuesta exitosa
      console.log('Producto creado exitosamente');
    } else {
      // Manejar el error
      console.error('Error al crear el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Crear producto</h2>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Descripción</label>
        <textarea id="description" name="description" value={product.description} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="image">Imagen (URL)</label>
        <input type="text" id="image" name="image" value={product.image} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Costo</label>
        <input type="number" id="cost" name="cost" value={product.cost} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Precio</label>
        <input type="number" id="price" name="price" value={product.price} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="department">Departamento</label>
        <input type="text" id="department" name="department" value={product.department} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="brand">Marca</label>
        <input type="text" id="brand" name="brand" value={product.brand} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="line">Línea</label>
        <input type="text" id="line" name="line" value={product.line} onChange={handleChange} required />
      </div>
      <button type="submit">Crear Producto</button>
    </form>
  );
}