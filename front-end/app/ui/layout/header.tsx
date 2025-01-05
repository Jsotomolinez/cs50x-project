import Link from 'next/link';
import styles from './header.module.css';

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2>💜💜💜</h2>
        <h2>Search bar</h2>
        <div className={styles.buttons}>
            <p>🤵</p>
            <p>🛒</p>
        </div>
      </div>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link href="#">
              item 1
             </Link>
          </li>
          <li>
            <Link href="#">
              item 2
            </Link>
          </li>
          <li>
            <Link href="#">
              item 3
            </Link>
          </li>
          <li>
            <Link  href="#">
              item 4
            </Link>
          </li>
          <li>
            <Link href="#">
              item 5
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}