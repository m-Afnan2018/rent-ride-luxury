'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './FAQ.module.css';
import { FAQ_DATA } from '@/constants/faq';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1); // Default first one open

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            A seamless experience designed to get you behind the wheel of your dream car — quickly, effortlessly, and in style.
          </p>
        </div>

        <div className={styles.contentGrid}>
          
          {/* FAQ Accordion */}
          <div className={styles.faqList}>
            {FAQ_DATA.map((item) => (
              <div 
                key={item.id} 
                className={`${styles.faqItem} ${activeIndex === item.id ? styles.active : ''}`}
              >
                <div 
                  className={styles.questionRow} 
                  onClick={() => toggleFAQ(item.id)}
                >
                  <h3 className={styles.question}>{item.question}</h3>
                  <span className={styles.icon}>
                    {activeIndex === item.id ? '−' : '+'}
                  </span>
                </div>
                
                <div className={styles.answerWrapper}>
                  <p className={styles.answer}>
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Image */}
          <div className={styles.imageWrapper}>
            <Image
              src="/images/range_rover_suv.png"
              alt="Luxury Range Rover SUV"
              fill
              className={styles.carImage}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
