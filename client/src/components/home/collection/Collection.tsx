'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Collection.module.css';
import { COLLECTION_DATA, COLLECTION_FILTERS } from '@/constants/collection';

export default function Collection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredCars, setFilteredCars] = useState(COLLECTION_DATA);
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredCars(COLLECTION_DATA);
    } else {
      setFilteredCars(COLLECTION_DATA.filter(car => car.brand === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section className={styles.container}>
      <div className={styles.contentWrapper}>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            A Collection Worth <span className={styles.accent}>Experiencing</span>
          </h2>
          <p className={styles.subtitle}>
            Handpicked luxury cars that redefine style, performance, and sophistication on every drive.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {COLLECTION_FILTERS.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filteredCars.map((car) => (
            <div
              key={`${car.id}-${activeFilter}`}
              className={`${styles.card} ${styles.animEnter}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className={styles.carImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.carTitle}>{car.name}</h3>

                <div className={styles.specs}>
                  <div className={styles.specItem}>
                    <div className={styles.specIcon}>
                      <Image src="/icons/car-seat 1.svg" alt="Seats" width={24} height={24} />
                    </div>
                    <div className={styles.specInfo}>
                      <span className={styles.specLabel}>Seats</span>
                      <span className={styles.specValue}>{car.specs.seats}</span>
                    </div>
                  </div>

                  <div className={styles.specItem}>
                    <div className={styles.specIcon}>
                      <Image src="/icons/car-engine 1.svg" alt="Engine" width={24} height={24} />
                    </div>
                    <div className={styles.specInfo}>
                      <span className={styles.specLabel}>Engine</span>
                      <span className={styles.specValue}>{car.specs.engine}</span>
                    </div>
                  </div>

                  <div className={styles.specItem}>
                    <div className={styles.specIcon}>
                      <Image src="/icons/luggae.svg" alt="Luggage" width={24} height={24} />
                    </div>
                    <div className={styles.specInfo}>
                      <span className={styles.specLabel}>Luggage</span>
                      <span className={styles.specValue}>{car.specs.luggage}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.priceWrapper}>
                  <span className={styles.price}>${car.price.toLocaleString()}</span>
                  <span className={styles.priceUnit}> / Day</span>
                </div>

                <div className={styles.actions}>
                  <button className={`${styles.iconBtn} ${styles.whatsappBtn}`} aria-label="WhatsApp">
                    <Image src="/icons/whatsapp-fill.png" alt="WhatsApp" width={20} height={20} />
                  </button>
                  <button className={`${styles.iconBtn} ${styles.phoneBtn}`} aria-label="Call">
                    <Image src="/icons/ic_sharp-call.svg" alt="Call" width={20} height={20} />
                  </button>
                  <button className={styles.viewMoreBtn}>
                    View More ↗
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
