'use client'

import { useState } from 'react';
import { ProductDb } from '@/app/definitons/general';
import styles from './forms.module.css';
import config from '@/app/config.json'

export default function AddProduct() {

  // const departments = fetch(`${config.rootURL}/departments/get_departments`);
  // const departments = fetch(`${config.rootURL}/departments/get_departments`);
  // const departments = fetch(`${config.rootURL}/departments/get_departments`);
  // const departments = fetch(`${config.rootURL}/departments/get_departments`);

  const [product, setProduct] = useState<Omit<ProductDb, 'id'>>({
    name: '',
    description: '',
    image: '',
    cost: 0,
    price: 0,
    department_id: 0,
    brand_id: 0,
    line_id: 0,
    provider_id: 0,
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
    const response = await fetch(`${config.rootURL}/products/create`, {
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
        <label htmlFor="department_id">Departamento</label>
        <input type="number" id="department_id" name="department_id" value={product.department_id} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="brand_id">Marca</label>
        <input type="number" id="brand_id" name="brand_id" value={product.brand_id} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="line_id">Línea</label>
        <input type="number" id="line_id" name="line_id" value={product.line_id} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="provider_id">Línea</label>
        <input type="number" id="provider_id" name="provider_id" value={product.provider_id} onChange={handleChange} required />
      </div>

      <button type="submit">Crear Producto</button>
    </form>
  );
}