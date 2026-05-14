'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './CarHero.module.css';
import { Car } from '@/components/ui/CarCard/CarCard';
import Button from '@/components/ui/Button';

interface ExtendedCar extends Car {
  gallery?: string[];
  description?: string;
  specs: Car['specs'] & { type?: string };
}

interface CarHeroProps {
  car: ExtendedCar;
}

const CarHero: React.FC<CarHeroProps> = ({ car }) => {
  const [activeImage, setActiveImage] = useState(car.image);

  return (
    <section className={styles.container}>
      <div className={styles.contentWrapper}>

        {/* Left Side: Images */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
            <Image
              src={activeImage}
              alt={car.name}
              fill
              className={styles.mainImage}
              priority
            />
          </div>

          <div className={styles.gallery}>
            {(car.gallery || [car.image]).map((img, idx) => (
              <div
                key={idx}
                className={`${styles.thumbWrapper} ${activeImage === img ? styles.activeThumb : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <Image
                  src={img}
                  alt={`${car.name} gallery ${idx}`}
                  fill
                  className={styles.thumb}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Info */}
        <div className={styles.infoSection}>
          <h1 className={styles.title}>{car.name}</h1>

          <div className={styles.priceContainer}>
            <span className={styles.priceLabel}>Starting At</span>
            <div className={styles.priceValue}>
              <span className={styles.price}>${car.price.toLocaleString('en-US')}</span>
              <span className={styles.unit}> / Day</span>
            </div>
          </div>

          <p className={styles.description}>
            {car.description || "Experience luxury and performance like never before. Handpicked for excellence, this vehicle defines style and sophistication."}
          </p>

          <div className={styles.specGrid}>
            <div className={styles.specItem}>
              <div className={styles.specIcon}>
                <Image src="/icons/car-seat 1.svg" alt="Seats" width={24} height={24} />
              </div>
              <div className={styles.specInfo}>
                <span className={styles.specLabelText}>Seats</span>
                <span className={styles.specValueText}>{car.specs.seats}</span>
              </div>
            </div>

            <div className={styles.specItem}>
              <div className={styles.specIcon}>
                <Image src="/icons/car-engine 1.svg" alt="Engine" width={24} height={24} />
              </div>
              <div className={styles.specInfo}>
                <span className={styles.specLabelText}>Engine</span>
                <span className={styles.specValueText}>{car.specs.engine}</span>
              </div>
            </div>

            <div className={styles.specItem}>
              <div className={styles.specIcon}>
                <Image src="/icons/luggae.svg" alt="Luggage" width={24} height={24} />
              </div>
              <div className={styles.specInfo}>
                <span className={styles.specLabelText}>Luggage</span>
                <span className={styles.specValueText}>{car.specs.luggage}</span>
              </div>
            </div>

            <div className={styles.specItem}>
              <div className={styles.specIcon}>
                <Image src="/icons/super-car.svg" alt="Type" width={24} height={24} />
              </div>
              <div className={styles.specInfo}>
                <span className={styles.specLabelText}>Type</span>
                <span className={styles.specValueText}>{car.specs.type || 'Luxury Car'}</span>
              </div>
            </div>
          </div>

          <Button className={styles.bookBtn}>
            Book Now
          </Button>
        </div>

      </div>
    </section>
  );
};

export default CarHero;
