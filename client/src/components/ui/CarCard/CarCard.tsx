import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CarCard.module.css';

export interface CarSpecs {
  seats: number | string;
  engine: string;
  luggage: string;
}

export interface Car {
  id: number;
  name: string;
  brand: string;
  image: string;
  specs: CarSpecs;
  price: number;
}

interface CarCardProps {
  car: Car;
  className?: string;
}

const CarCard: React.FC<CarCardProps> = ({ car, className }) => {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      <Link href={`/cars/${car.id}`} className={styles.imageWrapper}>
        <Image
          src={car.image}
          alt={car.name}
          fill
          className={styles.carImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className={styles.cardContent}>
        <Link href={`/cars/${car.id}`}>
          <h3 className={styles.carTitle}>{car.name}</h3>
        </Link>

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
          <span className={styles.price}>${car.price.toLocaleString('en-US')}</span>
          <span className={styles.priceUnit}> / Day</span>
        </div>

        <div className={styles.actions}>
          <button className={`${styles.iconBtn} ${styles.whatsappBtn}`} aria-label="WhatsApp">
            <Image src="/icons/whatsapp-fill.png" alt="WhatsApp" width={20} height={20} />
          </button>
          <button className={`${styles.iconBtn} ${styles.phoneBtn}`} aria-label="Call">
            <Image src="/icons/ic_sharp-call.svg" alt="Call" width={20} height={20} />
          </button>
          <Link href={`/cars/${car.id}`} className={styles.viewMoreBtn}>
            View More ↗
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
