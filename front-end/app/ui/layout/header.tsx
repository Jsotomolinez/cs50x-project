'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import SearchBar from './searchBar';

import { Brand, Department, Line } from '@/app/definitons/general';
import config from '@/app/config.json'

import styles from './header.module.css';

export default function Header(){

  const [brands, setBrans] = useState<Brand[]| null>(null)
  const [departments, setDepartments] = useState<Department[]| null>(null)
  const [lines, setLines] = useState<Line[]| null>(null)

  useEffect(() => {
    const fetchNavInfo = async () => {
      const brandsResponse = await fetch(`${config.rootURL}/brands/get_brands`);
      const departmentsResponse = await fetch(`${config.rootURL}/departments/get_departments`);
      const linesResponse = await fetch(`${config.rootURL}/lines/get_lines`);
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
            <Link href='/cart'>🛒</Link>
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
                  className={styles.nav_link_container}
                  key={`brand${brand.id}`}
                  >
                  <Link
                    className={styles.nav_link}
                    href={{
                    pathname: '/products',
                    query: {category: 'brands', query: brand.id}
                  }}>
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
                  className={styles.nav_link_container}
                  key={`department${department.id}`}
                  >
                  <Link
                    className={styles.nav_link}
                    href={{
                    pathname: '/products',
                    query: {category: 'departments', query: department.id}
                  }}>
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
                className={styles.nav_link_container}
                key={`line${line.id}`}
                >
                <Link
                  className={styles.nav_link}
                  href={{
                  pathname: '/products',
                  query: {category: 'lines', query: line.id}
                }}>
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