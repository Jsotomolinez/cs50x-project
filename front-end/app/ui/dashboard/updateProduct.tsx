'use client'

import { useState } from 'react';
import { ProductInfo } from '@/app/definitons/general';
import styles from './forms.module.css';
import config from '@/app/config.json'

export default function UpdateProduct() {
  const [productId, setProductId] = useState<number | ''>('');
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

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(Number(e.target.value));
  };

  const loadProductData = async () => {
    if (productId === '') {
      console.error('Product ID is required');
      return;
    }

    const response = await fetch(`${config.rootURL}/products/${productId}`);
    if (response.ok) {
      const productData: ProductInfo = await response.json();
      setProduct({
        name: productData.name,
        description: productData.description,
        image: productData.image,
        cost: productData.cost,
        price: productData.price,
        department: productData.department,
        brand: productData.brand,
        line: productData.line,
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

    const response = await fetch(`${config.rootURL}/products/${productId}`, {
      method: 'PATCH',
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
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}