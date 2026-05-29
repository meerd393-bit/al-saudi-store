"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        setRecentOrders(data.slice(0, 5)); // show max 5
        setTotalSales(data.length * 519); // 519 SAR per product
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrders();
  }, []);

  const stats = [
    { title: 'إجمالي المبيعات', value: `${totalSales} ر.س`, change: 'مباشر', icon: <DollarSign size={24} /> },
    { title: 'الطلبات الكلية', value: recentOrders.length, change: 'مباشر', icon: <ShoppingBag size={24} /> },
    { title: 'العملاء', value: recentOrders.length, change: 'مباشر', icon: <Users size={24} /> },
    { title: 'معدل التحويل', value: '5.4%', change: '+1.2%', icon: <TrendingUp size={24} /> },
  ];

  return (
    <>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>نظرة عامة</h1>
        <p style={{ color: '#aaa' }}>ملخص أداء المتجر والمبيعات.</p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{stat.title}</span>
              <div className={styles.statIcon}>{stat.icon}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statChange}>
                <TrendingUp size={16} /> {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>أحدث الطلبات الحقيقية</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>المنتج</th>
              <th>المبلغ</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>لا توجد طلبات حتى الآن</td>
              </tr>
            ) : (
              recentOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.product} ({order.color})</td>
                  <td style={{ fontWeight: 600 }}>{order.amount}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles['status-pending']}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
