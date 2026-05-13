'use client';

import React from 'react';
import Image from 'next/image';
import styles from './DriveSelection.module.css';
import { DRIVE_TYPES } from '@/constants/driveSelection';

export default function DriveSelection() {
  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>
            Choose Your <span className={styles.accent}>Perfect Drive</span>
          </h2>
          <p className={styles.subtitle}>
            Explore our curated collection of luxury vehicles by body type — from powerful SUVs to sleek sports cars, crafted for every journey.
          </p>
        </div>

        <div className={styles.grid}>
          {DRIVE_TYPES.map((drive) => (
            <div key={drive.id} className={styles.card}>
              
              {/* Default Content */}
              <div className={styles.defaultContent}>
                <div 
                  className={styles.iconWrapper} 
                  style={{ 
                    WebkitMaskImage: drive.iconMask,
                    maskImage: drive.iconMask
                  }} 
                />
                <h3 className={styles.cardTitle}>{drive.title}</h3>
                <p className={styles.cardSubtitle}>{drive.subtitle}</p>
              </div>

              {/* Hover Overlay */}
              <div className={styles.hoverOverlay}>
                <Image
                  src={drive.hoverImage}
                  alt={drive.title}
                  fill
                  className={styles.hoverImage}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.glassButtonWrapper}>
                  <button className={styles.glassButton}>
                    View More
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
