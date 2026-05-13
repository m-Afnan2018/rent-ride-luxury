'use client';

import Image from 'next/image';
import styles from './Experts.module.css';

export default function Experts() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.textContent}>
          <h2 className={styles.title}>
            Meet Our <span className={styles.accent}>Experts</span>
          </h2>
          <div className={styles.description}>
            <p>Behind every great experience is a team driven by passion, creativity, and innovation.</p>
            <p>We collaborate, create, and solve challenges together to build meaningful digital products that leave a lasting impact.</p>
            <p>Our diverse minds and shared vision help transform ideas into powerful and user-focused experiences.</p>
          </div>
        </div>

        <div className={styles.collage}>

          <div className={`${styles.expertCard} ${styles.img1}`}>
            <Image src="/images/expert-2.jpg" alt="Expert" fill className={styles.expertImage} />
          </div>

          <div className={`${styles.expertCard} ${styles.img2}`}>
            <Image src="/images/expert-3.jpg" alt="Expert" fill className={styles.expertImage} />
          </div>

          <div className={`${styles.expertCard} ${styles.img3}`}>
            <Image src="/images/expert-6.jpg" alt="Expert" fill className={styles.expertImage} />
          </div>

          <div className={`${styles.expertCard} ${styles.img4}`}>
            <Image src="/images/expert-4.jpg" alt="Expert" fill className={styles.expertImage} />
          </div>

          <div className={`${styles.expertCard} ${styles.img5}`}>
            <Image src="/images/expert-5.jpg" alt="Expert" fill className={styles.expertImage} />
          </div>

          <div className={`${styles.expertCard} ${styles.img6}`}>
            <Image src="/images/expert-1.jpg" alt="Expert" fill className={styles.expertImage} />
          </div>

          {/* SVG Decorations */}
          <div className={`${styles.decoration} ${styles.lines}`}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round">
              <path d="M20 0 L15 15 M5 5 L12 18 M0 20 L15 20" />
            </svg>
          </div>

          <div className={`${styles.decoration} ${styles.star}`}>
            <img src="/icons/star.svg" alt="Star" width={80} height={80} />
          </div>

          <div className={`${styles.decoration} ${styles.arrow}`}>
            <img src="/icons/arrow-line.svg" alt="Arrow" width={80} height={80} />
          </div>

        </div>

      </div>
    </section>
  );
}
