'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Locations.module.css';
import Slider, { SliderRef } from '@/components/ui/Slider';
import { LOCATIONS_DATA } from '@/constants/locations';

export default function Locations() {
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
          Drive Across <span className={styles.accent}>Australia</span>
        </h2>
        <p className={styles.subtitle}>
          Experience premium luxury car rentals across Australia's most iconic cities and destinations.
        </p>
      </div>

      <div className={styles.sliderWrapper}>
        <Slider ref={sliderRef} gap={24} paddingLeft={paddingOffset}>
          {LOCATIONS_DATA.map((location) => (
            <div key={location.id} className={styles.locationCard}>
              <Image
                src={location.image}
                alt={location.city}
                fill
                className={styles.locationImage}
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 260px, 300px"
              />
              <div className={styles.overlay}>
                <h3 className={styles.cityName}>{location.city}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.controlsContainer}>
        <button 
          className={styles.controlBtn} 
          onClick={() => sliderRef.current?.scrollPrev()}
          aria-label="Previous location"
        >
          <div className={styles.controlIcon}>
            <Image src="/icons/prev.svg" alt="Prev" fill />
          </div>
        </button>
        <button 
          className={styles.controlBtn} 
          onClick={() => sliderRef.current?.scrollNext()}
          aria-label="Next location"
        >
          <div className={styles.controlIcon}>
            <Image src="/icons/next.svg" alt="Next" fill />
          </div>
        </button>
      </div>
    </section>
  );
}
