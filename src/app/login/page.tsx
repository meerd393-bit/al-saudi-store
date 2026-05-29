"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // The password is "admin123"
    if (password === 'admin123') {
      // Set the auth cookie
      document.cookie = "admin_token=alsaudi_secure_2026; path=/; max-age=86400";
      // Force hard navigation to ensure middleware runs
      window.location.href = '/admin';
    } else {
      setError('كلمة المرور غير صحيحة. حاول مرة أخرى.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ background: 'var(--primary)', color: '#000', padding: '15px', borderRadius: '50%' }}>
            <Lock size={32} />
          </div>
        </div>
        <div className={styles.logo}>
          ال سعودي <span>ستور</span>
        </div>
        <p className={styles.subtitle}>الرجاء إدخال كلمة المرور للوصول إلى لوحة التحكم</p>

        {error && <div className={styles.errorMsg}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label>كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              dir="ltr"
            />
          </div>
          <button type="submit" className={styles.loginBtn}>
            تسجيل الدخول
          </button>
        </form>
        
        <p style={{ marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
          تلميح: كلمة المرور هي admin123
        </p>
      </div>
    </div>
  );
}
