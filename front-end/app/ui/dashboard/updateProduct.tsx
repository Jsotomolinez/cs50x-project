'use client'

import { useState } from 'react';
import { Brand, CreateProduct, Department, Line, ProviderInfo } from '@/app/definitons/general';
import styles from './forms.module.css';
import config from '@/app/config.json'

export default function UpdateProduct(
  { brands, departments, lines, providers}:
    {
      brands: Brand[] | null;
      departments: Department[] | null;
      lines: Line[] | null;
      providers: ProviderInfo[] | null;
    }
  ) {

  const [departmentId, setDepartmentId] = useState(0);
  const [productId, setProductId] = useState<number | ''>('');
  const [product, setProduct] = useState<CreateProduct>({
    name: '',
    description: '',
    image: '',
    cost: 0,
    price: 0,
    department: '',
    brand: '',
    line: '',
    provider: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const productData: CreateProduct = await response.json();
      setProduct({
        name: productData.name,
        description: productData.description,
        image: productData.image,
        cost: productData.cost,
        price: productData.price,
        department: productData.department,
        brand: productData.brand,
        line: productData.line,
        provider: productData.provider,
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
        <label htmlFor="department">Departamento</label>
        <select name="department" id="department" value={product.department} onChange={(e) => {
            handleChange(e);
            setDepartmentId(departments?.find(dept => dept.name === e.target.value)?.id || 0);
          }}>
          {departments && departments.map((department) => {
            return <option value={department.name} key={`dpt${department.name}`}>{department.name}</option>
          })}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="brand">Marca</label>
        <select name="brand" id="brand" value={product.brand} onChange={handleChange}>
          {brands && brands.map((brand) => {
            return <option value={brand.name} key={`brand${brand.name}`}>{brand.name}</option>
          })
          }
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="line_id">Línea</label>
        <select name="line" id="line">
          {lines && lines.map((line) => {
            if (line.department_id === departmentId) {
              return <option value={line.name} key={`line${line.name}`}>{line.name}</option>
            }
          })}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="provider">Proveedor</label>
        <select name="provider" id="provider">
          {providers && providers.map((provider) => {
            return <option value={provider.name} key={`provider${provider.name}`}>{provider.name}</option>
            }
          )}
        </select>
      </div>
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}