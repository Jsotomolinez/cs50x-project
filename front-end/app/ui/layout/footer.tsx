import React from 'react';
import styles from './footer.module.css';
// import Link from 'next/link';

import config from '@/app/config.json'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
      {/* <nav className={styles.nav}>
        <Link href="/privacy-policy">Privacy Policy</Link> | 
        <Link href="/terms-of-service">Terms of Service</Link> | 
        <Link href="/contact">Contact</Link>
      </nav>  */}
    </footer>
  );
};
