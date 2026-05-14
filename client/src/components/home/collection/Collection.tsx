'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Collection.module.css';
import { COLLECTION_DATA, COLLECTION_FILTERS } from '@/constants/collection';
import CarCard from '@/components/ui/CarCard/CarCard';

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
            <CarCard
              key={`${car.id}-${activeFilter}`}
              car={car}
              className={styles.animEnter}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
