import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';
import styles from './store.module.css';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          ال سعودي <span className="text-gradient">ستور</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${styles.active}`}>الرئيسية</Link>
          <Link href="#products" className={styles.navLink}>الجوالات</Link>
          <Link href="#accessories" className={styles.navLink}>الإكسسوارات</Link>
          <Link href="#about" className={styles.navLink}>من نحن</Link>
        </div>

        <div className={styles.actions}>
          <button className={styles.iconBtn}>
            <Search size={20} />
          </button>
          <button className={styles.iconBtn}>
            <ShoppingCart size={20} />
          </button>
          <Link href="/admin" className={styles.iconBtn}>
            <User size={20} />
          </Link>
        </div>
      </nav>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </>
  );
}
