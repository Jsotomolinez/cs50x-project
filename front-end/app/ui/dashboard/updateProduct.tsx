'use client'

import { useState } from 'react';
import { ProductDb } from '@/app/definitons/general';
import styles from './forms.module.css';
import config from '@/app/config.json'

export default function UpdateProduct() {
  const [productId, setProductId] = useState<number | ''>('');
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

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(Number(e.target.value));
  };

  const loadProductData = async () => {
    if (productId === '') {
      console.error('Product ID is required');
      return;
    }

    const response = await fetch(`${config.rootURL}/products/get_data_by_id/${productId}`);
    if (response.ok) {
      const productData: ProductDb = await response.json();
      setProduct({
        name: productData.name,
        description: productData.description,
        image: productData.image,
        cost: productData.cost,
        price: productData.price,
        department_id: productData.department_id,
        brand_id: productData.brand_id,
        line_id: productData.line_id,
        provider_id: productData.provider_id,
      });
    } else {
      console.error('Error al cargar los datos del producto');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productId === '') {
      console.error('Product ID is required');
      return;
    }

    const response = await fetch(`${config.rootURL}/products/update/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      console.log('Producto actualizado exitosamente');
    } else {
      console.error('Error al actualizar el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Actualizar Producto</h2>
      <div className={styles.formGroup}>
        <label htmlFor="productId">ID del Producto</label>
        <input
          type="number"
          id="productId"
          name="productId"
          value={productId}
          onChange={handleProductIdChange}
          required
        />
        <button type="button" onClick={loadProductData}>Cargar Datos del Producto</button>
      </div>
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
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}