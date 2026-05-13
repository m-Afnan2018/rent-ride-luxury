'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Purpose.module.css';

export default function Purpose() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>
            Driving Innovation Through <span className={styles.accent}>Purpose</span>
          </h2>
          <p className={styles.subtitle}>
            We are more than a rental company; we are pioneers in luxury mobility, dedicated to setting new standards in the automotive industry.
          </p>
        </div>

        <div className={styles.contentGrid}>
          
          <div className={styles.imageWrapper}>
            <Image 
              src="/images/about-img.jpg" 
              alt="Luxury Car Grille" 
              fill 
              className={styles.purposeImage}
            />
          </div>

          <div className={styles.cardsContainer}>
            <div className={styles.goldCard}>
              <h3 className={styles.cardTitle}>Our Mission</h3>
              <p className={styles.cardText}>
                To democratize luxury travel by providing accessible, world-class vehicle experiences that elevate everyday journeys into unforgettable memories.
              </p>
            </div>
            
            <div className={styles.goldCard}>
              <h3 className={styles.cardTitle}>Our Vision</h3>
              <p className={styles.cardText}>
                To be the globally recognized leader in premium mobility solutions, constantly innovating to deliver unparalleled comfort, safety, and prestige.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
