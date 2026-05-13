'use client';

import React from 'react';
import styles from './Promo.module.css';
import Button from '@/components/ui/Button';

export default function Promo() {
  return (
    <section className={styles.section}>
      {/* Background Video */}
      <video
        className={styles.videoBackground}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/car_showrooms.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>
          <span className={styles.accent}>10% - 15% OFF</span> for first booking
        </h2>
        <p className={styles.description}>
          Book your first ride today and unlock premium discounts on selected luxury vehicles.
        </p>
        <Button variant="primary" size="md" className={styles.button}>
          Contact Now
        </Button>
      </div>
    </section>
  );
}
