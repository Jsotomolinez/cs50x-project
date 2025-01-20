'use client'

import { useState } from 'react';
import styles from './forms.module.css';
import config from '../../config.json';
import { ProviderInfo } from '@/app/definitons/general';

export default function AddProvider() {
  const [provider, setProvider] = useState<ProviderInfo>({
    name: '',
    phone_number: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProvider((prevProvider) => ({
        ...prevProvider,
        [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${config.rootURL}/providers/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(provider),
    });

    if (response.ok) {
      console.log('Proveedor creado exitosamente');
      setProvider({
        name: '',
        phone_number: '',
        email: '',
      }); // Limpiar el campo de entrada después de enviar
    } else {
      console.error('Error al crear el proveedor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre del Proveedor</label>
        <input
          type="text"
          id="name"
          name="name"
          value={provider.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone_number">Telefono del Proveedor</label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={provider.phone_number || ''}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email del Proveedor</label>
        <input
          type="text"
          id="email"
          name="email"
          value={provider.email || ''}
          onChange={handleChange}
        />
      </div>


      <button type="submit">Crear Proveedor</button>
    </form>
  );
}