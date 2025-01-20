'use client'

import { useState } from 'react';
import styles from './forms.module.css';
import config from '../../config.json';

export default function AddDepartment() {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${config.rootURL}/departments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });

    if (response.ok) {
      console.log('Departamento creado exitosamente');
      setName(''); // Limpiar el campo de entrada después de enviar
    } else {
      console.error('Error al crear el departamento');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre del Departamento</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Crear Departamento</button>
    </form>
  );
}