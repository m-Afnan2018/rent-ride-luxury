'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Brands.module.css';
import Slider, { SliderRef } from '@/components/ui/Slider';
import { BRANDS_DATA } from '@/constants/brands';

export default function Brands() {
  const sliderRef = useRef<SliderRef>(null);
  const [paddingOffset, setPaddingOffset] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const containerWidth = 1400; // Matches --container-max

      if (screenWidth > containerWidth) {
        const offset = (screenWidth - containerWidth) / 2 + 16;
        setPaddingOffset(offset);
      } else {
        setPaddingOffset(16);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>
          <span className={styles.accent}>Explore</span> Luxury Brands
        </h2>
        <p className={styles.subtitle}>
          Discover world-renowned automotive brands crafted for performance, <br /> elegance, and prestige.
        </p>
      </div>

      <div className={styles.sliderWrapper}>
        <Slider ref={sliderRef} gap={30} paddingLeft={paddingOffset}>
          {BRANDS_DATA.map((brand, index) => (
            <div key={`${brand.id}-${index}`} className={styles.brandCard}>
              <div className={styles.brandLogo}>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className={styles.logoImage}
                  sizes="(max-width: 768px) 260px, 320px"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.controlsContainer}>
        <button
          className={styles.controlBtn}
          onClick={() => sliderRef.current?.scrollPrev()}
          aria-label="Previous brand"
        >
          <div className={styles.controlIcon} style={{ position: 'relative' }}>
            <Image src="/icons/prev.svg" alt="Prev" fill />
          </div>
        </button>
        <button
          className={styles.controlBtn}
          onClick={() => sliderRef.current?.scrollNext()}
          aria-label="Next brand"
        >
          <div className={styles.controlIcon} style={{ position: 'relative' }}>
            <Image src="/icons/next.svg" alt="Next" fill />
          </div>
        </button>
      </div>
    </section>
  );
}
