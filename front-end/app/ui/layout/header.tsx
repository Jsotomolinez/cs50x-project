'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import SearchBar from './searchBar';

import { Brand, Department, Line } from '@/app/definitons/general';

import styles from './header.module.css';

export default function Header(){

  const [brands, setBrans] = useState<Brand[]| null>(null)
  const [departments, setDepartments] = useState<Department[]| null>(null)
  const [lines, setLines] = useState<Line[]| null>(null)

  useEffect(() => {
    const fetchNavInfo = async () => {
      const brandsResponse = await fetch('http://127.0.0.1:8000/brands/get_brands');
      const departmentsResponse = await fetch('http://127.0.0.1:8000/departments/get_departments');
      const linesResponse = await fetch('http://127.0.0.1:8000/lines/get_lines');
      const brandsInfo: Brand[] = await brandsResponse.json();
      const departmentsInfo: Department[] = await departmentsResponse.json();
      const linesInfo: Line[] = await linesResponse.json();
      setBrans(brandsInfo);
      setDepartments(departmentsInfo);
      setLines(linesInfo);
    };

    fetchNavInfo();
  }, []);


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo_container}>
          <Link
          href={'/'}
            className={styles.logo}
          >
            <Image
              src='/duck.webp'
              alt='Logo'
              height={75}
              width={75}
              />
              <h2>CS50 Store</h2>
            </Link>
          </div>
        <SearchBar/>
        <div className={styles.buttons}>
          <p>🔅</p>
            <p>🛒</p>
        </div>
      </div>
      <nav>
        <ul className={styles.nav}>
          <li>
          {brands && (
            <div className={styles.dropdown}>
              <button className={styles.dropdown_button}>Brands</button>
              <div className={styles.dropdown_content}>
                {brands.map((brand) => (
                  <div
                    className={styles.nav_link}
                    key={`brand${brand.id}`}
                    >
                  <Link href={`/brands/${brand.id}`}>
                    {brand.name}
                  </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          </li>
          <li>
          {departments && (
            <div className={styles.dropdown}>
              <button className={styles.dropdown_button}>Departments</button>
              <div className={styles.dropdown_content}>
                {departments.map((department) => (
                  <div
                    className={styles.nav_link}
                    key={`dpt${department.id}`}
                    >
                  <Link href={`/departments/${department.id}`}>
                    {department.name}
                  </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          </li>
          <li>
          {lines && (
            <div className={styles.dropdown}>
              <button className={styles.dropdown_button}>Lines</button>
              <div className={styles.dropdown_content}>
                {lines.map((line) => (
                  <div
                    className={styles.nav_link}
                    key={`line${line.id}`}
                    >
                    <Link href={`/lines/${line.id}`}>
                      {line.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          </li>
        </ul>
      </nav>
    </header>
  );
}