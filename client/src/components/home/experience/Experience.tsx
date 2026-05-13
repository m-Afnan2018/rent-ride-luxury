import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Experience.module.css';
import { EXPERIENCE_DATA } from '@/constants/experience';
import Button from '@/components/ui/Button';

export default function Experience() {
  const { title, description, linkText, linkHref, stats, buttonText } = EXPERIENCE_DATA;

  return (
    <section className={styles.container}>
      <div className={styles.glow} />
      <div className={styles.contentWrapper}>
        {/* Main Row */}
        <div className={styles.mainRow}>
          <div className={styles.leftSide}>
            <Image
              src="/icons/solid_union.svg"
              alt="Experience Icon"
              width={250}
              height={120}
              className={styles.unionLogo}
              priority
            />
          </div>

          <div className={styles.centerSide}>
            <h2 className={styles.title}>
              {title.main}
              <span className={styles.accent}>{title.accent}</span>
              {title.sub}
            </h2>
            <p className={styles.description}>{description}</p>
            <Link href={linkHref} className={styles.aboutLink}>
              {linkText} <span style={{ marginLeft: '4px' }}>↗</span>
            </Link>
          </div>

          <div className={styles.rightSide}>
            <Image
              src="/images/mercedes_benz.png"
              alt="Mercedes Benz G-Wagon"
              width={600}
              height={400}
              className={styles.carImage}
              priority
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statHeader}>
                <span className={styles.statValue}>{stat.value}</span>
                <div className={styles.smallUnion} />
              </div>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}

          <div className={styles.buttonWrapper}>
            <Button className={styles.bookButton}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
