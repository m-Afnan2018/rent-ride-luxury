'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutHero.module.css';
import Button from '@/components/ui/Button';

export default function AboutHero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <h1 className={styles.title}>
          We <span className={styles.accent}>believe</span> driving is more than <br /> movement — it's an experience.
        </h1>

        <p className={styles.subtitle}>
          We curate exceptional luxury vehicles for those who appreciate performance, design, and prestige. Every journey is crafted to deliver comfort, elegance, and unforgettable moments on the road.
        </p>

        <div className={styles.statsContainer}>

          <div className={styles.statWrapper}>
            <div className={styles.divider}></div>
            <div className={styles.statContent}>
              <div className={styles.statText}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>CLIENTS SATISFACTION</span>
              </div>
              <div className={styles.statIcon}>
                <Image src="/icons/Union.png" alt="Icon" fill />
              </div>
            </div>
          </div>

          <div className={styles.statWrapper}>
            <div className={styles.divider}></div>
            <div className={styles.statContent}>
              <div className={styles.statText}>
                <span className={styles.statNumber}>6700</span>
                <span className={styles.statLabel}>LUXURY RIDES COMPLETED</span>
              </div>
              <div className={styles.statIcon}>
                <Image src="/icons/Union.png" alt="Icon" fill />
              </div>
            </div>
          </div>

          <div className={styles.statWrapper}>
            <div className={styles.divider}></div>
            <div className={styles.statContent}>
              <div className={styles.statText}>
                <span className={styles.statNumber}>250+</span>
                <span className={styles.statLabel}>PREMIUM CARS</span>
              </div>
              <div className={styles.statIcon}>
                <Image src="/icons/Union.png" alt="Icon" fill />
              </div>
            </div>
          </div>

        </div>

        <div className={styles.buttonGroup}>
          <Button variant='outline' className={styles.consultBtn}>Consult</Button>
          <Button variant='primary' className={styles.exploreBtn}>Explore</Button>
        </div>

        {/* The large car image is below the buttons based on the original full-page design.
            The user's latest cropped image just showed down to the buttons, but we keep the car image 
            so the page flows nicely into the Purpose section. */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/about-hero.jpg"
            alt="Mercedes AMG GT"
            fill
            className={styles.heroImage}
            priority
          />
        </div>

      </div>
    </section>
  );
}
