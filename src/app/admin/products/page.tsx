"use client";

import Image from 'next/image';
import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminProducts() {
  const products = [
    { id: 1, name: 'شبيه ايفون 17 برو ماكس النسخة الكوري', price: '519 ر.س', stock: 120, image: '/images/p1.jpeg' },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>إدارة المنتجات</h1>
          <p style={{ color: '#aaa' }}>أضف، عدل أو احذف منتجات متجرك.</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          <Plus size={18} /> منتج جديد
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>صورة المنتج</th>
              <th>اسم المنتج</th>
              <th>السعر</th>
              <th>المخزون</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
                    <Image src={product.image} alt={product.name} width={50} height={50} style={{ objectFit: 'contain' }} />
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{product.name}</td>
                <td style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.price}</td>
                <td>{product.stock} قطعة</td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ color: '#aaa', transition: 'var(--transition)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}>
                      <Edit size={18} />
                    </button>
                    <button style={{ color: '#aaa', transition: 'var(--transition)' }} onMouseOver={(e) => e.currentTarget.style.color = '#e74c3c'} onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
