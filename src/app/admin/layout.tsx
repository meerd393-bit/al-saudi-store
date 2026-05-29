"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Bell
} from 'lucide-react';
import styles from './admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'لوحة القيادة' },
    { path: '/admin/products', icon: <Package size={20} />, label: 'المنتجات' },
    { path: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'الطلبات' },
    { path: '/admin/customers', icon: <Users size={20} />, label: 'العملاء' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'الإعدادات' },
  ];

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          ال سعودي <br /><span>لوحة التحكم</span>
        </div>
        
        <nav className={styles.navMenu}>
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <Link href="/" className={styles.navItem}>
            <LogOut size={20} /> العودة للمتجر
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.topbarTitle}>
            مرحباً بعودتك، مدير النظام 👋
          </div>
          
          <div className={styles.topbarActions}>
            <button className="iconBtn" style={{ background: 'var(--secondary)', padding: '10px', borderRadius: '50%', color: 'white', border: '1px solid var(--border)' }}>
              <Bell size={20} />
            </button>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>SA</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>المدير</span>
                <span style={{ fontSize: '0.8rem', color: '#aaa' }}>admin@alsaudi.com</span>
              </div>
            </div>
          </div>
        </header>

        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
}
