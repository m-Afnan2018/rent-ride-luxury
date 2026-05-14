'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';
import Slider, { SliderRef } from '@/components/ui/Slider';
import { TESTIMONIALS_DATA } from '@/constants/testimonials';

export default function Testimonials() {
  const sliderRef = useRef<SliderRef>(null);
  const [paddingOffset, setPaddingOffset] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const containerWidth = 1400;

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
          What Our <span className={styles.accent}>Clients Say</span>
        </h2>
        <p className={styles.subtitle}>
          Trusted by luxury car enthusiasts for exceptional service, premium vehicles, and unforgettable driving experiences.
        </p>
      </div>

      <div className={styles.sliderWrapper}>
        <Slider ref={sliderRef} gap={24} paddingLeft={paddingOffset}>
          {TESTIMONIALS_DATA.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardInner}>
                
                {/* Front of card (Image) */}
                <div className={styles.cardFront}>
                  <Image
                    src={item.image || ''}
                    alt={item.author?.name || 'Client Testimonial'}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                </div>

                {/* Back of card (Review) */}
                <div className={styles.cardBack}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`${styles.starIcon} ${i < (item.rating || 0) ? styles.starFilled : styles.starEmpty}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className={styles.reviewText}>
                    "{item.text}"
                  </p>

                  <div className={styles.authorSection}>
                    <div className={styles.avatar}>
                      <Image
                        src={item.author?.avatar || ''}
                        alt={item.author?.name || 'Author'}
                        fill
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.authorInfo}>
                      <h4 className={styles.authorName}>{item.author?.name}</h4>
                      <span className={styles.authorRole}>{item.author?.role}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.controlsContainer}>
        <button
          className={styles.controlBtn}
          onClick={() => sliderRef.current?.scrollPrev()}
          aria-label="Previous testimonial"
        >
          <div className={styles.controlIcon} style={{ position: 'relative' }}>
            <Image src="/icons/prev.svg" alt="Prev" fill />
          </div>
        </button>
        <button
          className={styles.controlBtn}
          onClick={() => sliderRef.current?.scrollNext()}
          aria-label="Next testimonial"
        >
          <div className={styles.controlIcon} style={{ position: 'relative' }}>
            <Image src="/icons/next.svg" alt="Next" fill />
          </div>
        </button>
      </div>
    </section>
  );
}
