'use client'

import { useState } from 'react';
import styles from './forms.module.css';
import config from '../../config.json';

export default function AddBrand() {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${config.rootURL}/brands/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });

    if (response.ok) {
      console.log('Marca creada exitosamente');
      setName(''); // Limpiar el campo de entrada después de enviar
    } else {
      console.error('Error al crear la marca');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre de la Marca</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Crear Marca</button>
    </form>
  );
}