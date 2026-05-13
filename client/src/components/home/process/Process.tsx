'use client';

import React from 'react';
import styles from './Process.module.css';
import { PROCESS_STEPS } from '@/constants/process';

export default function Process() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.processWrapper}>
          
          {/* Left Side: Video */}
          <div className={styles.videoSection}>
            <video 
              className={styles.video}
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/video/green_car.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right Side: Content */}
          <div className={styles.contentSection}>
            <div className={styles.header}>
              <h2 className={styles.title}>
                <span className={styles.accent}>Our Luxury</span> Rental Process
              </h2>
              <p className={styles.subtitle}>
                A seamless experience designed to get you behind the wheel of your dream car — quickly, effortlessly, and in style.
              </p>
            </div>

            <div className={styles.steps}>
              {PROCESS_STEPS.map((step) => (
                <div key={step.id} className={styles.step}>
                  <div className={styles.stepNumber}>{step.id}</div>
                  <div className={styles.stepInfo}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
