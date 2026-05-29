"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Truck, ShieldCheck, Battery, Cpu, Camera, X, CheckCircle } from 'lucide-react';
import styles from './home.module.css';

const productImages = [
  '/images/p1.jpeg',
  '/images/p2.jpeg',
  '/images/p3.jpeg',
  '/images/p4.jpeg',
  '/images/p5.jpeg',
  '/images/p6.jpeg',
  '/images/p7.jpeg',
];

const colors = [
  { name: 'أحمر', hex: '#e74c3c' },
  { name: 'وردي', hex: '#ff9ff3' },
  { name: 'أخضر', hex: '#2ecc71' },
  { name: 'سيلفر', hex: '#bdc3c7' },
  { name: 'برتقالي', hex: '#e67e22' },
  { name: 'كحلي', hex: '#1e3799' },
];

export default function StoreHome() {
  const [activeImage, setActiveImage] = useState(productImages[0]);
  const [activeColor, setActiveColor] = useState(colors[0].name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      customerName: formData.get('customerName'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      product: 'ايفون 17 برو ماكس كوري',
      color: activeColor
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        setOrderId(result.order.id);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Product Detail Section */}
      <section className={styles.productDetailSection}>
        <div className={styles.productMain}>
          
          {/* Gallery */}
          <motion.div 
            className={styles.productGallery}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.mainImageWrapper}>
              <Image 
                src={activeImage} 
                alt="شبيه ايفون 17 برو ماكس" 
                width={500} 
                height={500} 
                className={styles.mainImage}
                priority
              />
            </div>
            <div className={styles.thumbnails}>
              {productImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`${styles.thumbnailWrapper} ${activeImage === img ? styles.active : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <Image src={img} alt={`Thumbnail ${index}`} width={80} height={80} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className={styles.productInfo}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className={styles.productBadge}>الأكثر مبيعاً 🌟</span>
            <h1 className={styles.productTitle}>
              شبيه ايفون 17 برو ماكس <br/>
              <span className="text-gradient">النسخة الكوري 🇰🇷</span>
            </h1>
            
            <div className={styles.priceContainer}>
              <span className={styles.price}>519 ر.س</span>
              <span className={styles.freeDelivery}>
                <Truck size={20} /> توصيل مجاني
              </span>
            </div>

            <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: 1.6 }}>
              تصميم فاخر مطابق للأصل بنسبة كبيرة جدًا. شكل فخم وإمكانيات جبارة بسعر مفاجأة! مناسب للألعاب، التصوير، والشغل.
            </p>

            <div className={styles.colorSelection}>
              <span className={styles.colorLabel}>اللون المختار: <span className="text-gradient">{activeColor}</span></span>
              <div className={styles.colorOptions}>
                {colors.map((color) => (
                  <div 
                    key={color.name}
                    className={`${styles.colorOption} ${activeColor === color.name ? styles.active : ''}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    onClick={() => setActiveColor(color.name)}
                  />
                ))}
              </div>
            </div>

            <button 
              className={styles.addToCartBig}
              onClick={() => {
                setIsModalOpen(true);
                setIsSubmitted(false);
              }}
            >
              <ShoppingCart size={24} /> اطلب الآن (الكمية محدودة)
            </button>
            
            <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.9rem', marginTop: '10px' }}>
              ✔️ ضمان سنة كاملة ضد عيوب الصناعة
            </p>
          </motion.div>
        </div>

        {/* Specs Section */}
        <motion.div 
          className={styles.specsSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.specsTitle}>المواصفات <span className="text-gradient">الجبارة</span></h2>
          
          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <Cpu size={30} className={styles.specIcon} />
              <div className={styles.specText}>
                <strong>مساحة وتخزين:</strong><br/>مساحة داخلية 1 تيرا مع رام 24 جيجا لسرعة وأداء خرافي.
              </div>
            </div>
            
            <div className={styles.specItem}>
              <Battery size={30} className={styles.specIcon} />
              <div className={styles.specText}>
                <strong>بطارية عملاقة:</strong><br/>بطارية 5000mAh بتقعد معاك طول اليوم بدون الحاجة لشحن متكرر.
              </div>
            </div>

            <div className={styles.specItem}>
              <Camera size={30} className={styles.specIcon} />
              <div className={styles.specText}>
                <strong>تصوير احترافي:</strong><br/>كاميرا 100 ميجا بيكسل تمنحك صوراً نقية واحترافية.
              </div>
            </div>

            <div className={styles.specItem}>
              <ShieldCheck size={30} className={styles.specIcon} />
              <div className={styles.specText}>
                <strong>ضمان شامل:</strong><br/>ضمان لمدة سنة كاملة ضد أي عيوب في الصناعة.
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Order Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setIsModalOpen(false)}
              >
                <X size={24} />
              </button>

              {!isSubmitted ? (
                <>
                  <h2 className={styles.modalTitle}>تأكيد الطلب</h2>
                  <div style={{ marginBottom: '20px', padding: '15px', background: 'var(--secondary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>المنتج:</span>
                      <strong style={{ color: 'var(--primary)' }}>ايفون 17 برو ماكس كوري</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>اللون:</span>
                      <strong>{activeColor}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>الإجمالي (شامل التوصيل):</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>519 ر.س</strong>
                    </div>
                  </div>

                  <form onSubmit={handleOrderSubmit}>
                    <div className={styles.formGroup}>
                      <label>الاسم بالكامل</label>
                      <input type="text" name="customerName" required placeholder="مثال: محمد عبدالله" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>رقم الجوال</label>
                      <input type="tel" name="phone" required placeholder="مثال: 05XXXXXXXX" dir="ltr" style={{ textAlign: 'right' }} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>المدينة والحي</label>
                      <input type="text" name="address" required placeholder="الرياض، حي العليا" />
                    </div>
                    <button type="submit" className={styles.submitBtn}>
                      إتمام الطلب
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successMessage}>
                  <CheckCircle size={60} color="#2ecc71" />
                  <h3>تم استلام طلبك بنجاح!</h3>
                  <p>رقم طلبك هو: <strong>{orderId}</strong></p>
                  <p>سيقوم فريقنا بالتواصل معك قريباً لتأكيد الشحن.</p>
                  <button 
                    className="btn-secondary" 
                    style={{ marginTop: '20px' }}
                    onClick={() => setIsModalOpen(false)}
                  >
                    العودة للمتجر
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
