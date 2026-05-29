"use client";

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الطلب نهائياً؟')) {
      try {
        await fetch(`/api/orders/${id}`, { method: 'DELETE' });
        fetchOrders();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>الطلبات</h1>
        <p style={{ color: '#aaa' }}>إدارة ومتابعة طلبات العملاء الفعلية.</p>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>بيانات العميل</th>
              <th>المنتج المطلوب (اللون)</th>
              <th>التاريخ</th>
              <th>الحالة</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>جاري تحميل الطلبات...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>لا توجد طلبات حتى الآن.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.id}</td>
                  <td>
                    <div>{order.customerName}</div>
                    <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{order.phone}</div>
                    <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{order.address}</div>
                  </td>
                  <td>
                    {order.product}<br/>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>اللون: {order.color}</span>
                  </td>
                  <td style={{ color: '#aaa', fontSize: '0.9rem' }}>
                    {new Date(order.date).toLocaleDateString('ar-SA')}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles['status-pending']}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDelete(order.id)}
                      style={{ color: '#aaa', transition: 'var(--transition)', padding: '8px' }} 
                      onMouseOver={(e) => e.currentTarget.style.color = '#e74c3c'} 
                      onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}
                    >
                      <Trash2 size={20} />
                    </button>
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
