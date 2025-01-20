'use client'

import { useState } from 'react';
import styles from './forms.module.css';
import config from '../../config.json';
import { LineCreate } from '@/app/definitons/general';

export default function AddLine() {
  const [line, setLine] = useState<LineCreate>({
    name: '',
    department: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLine((prevLine) => ({
        ...prevLine,
        [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${config.rootURL}/lines/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(line),
    });

    if (response.ok) {
      console.log('Línea creada exitosamente');
      setLine({
        name: '',
        department: ''
      }); // Limpiar el campo de entrada después de enviar
    } else {
      console.error('Error al crear la línea');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre de la línea</label>
        <input
          type="text"
          id="name"
          name="name"
          value={line.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="department">Departamento</label>
        <input
          type="text"
          id="departament"
          name="department"
          value={line.department}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Crear Línea</button>
    </form>
  );
}