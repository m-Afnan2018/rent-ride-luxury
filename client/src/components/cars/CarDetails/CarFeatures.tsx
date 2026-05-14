import React from 'react';
import Image from 'next/image';
import styles from './CarFeatures.module.css';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface CarFeaturesProps {
  car: {
    features?: Feature[];
  };
}

const CarFeatures: React.FC<CarFeaturesProps> = ({ car }) => {
  const features = car.features || [];

  return (
    <section className={styles.container}>
      <div className={styles.gradientGlow}></div>
      <div className={styles.contentWrapper}>
        <h2 className={styles.sectionTitle}>Car Features</h2>

        <div className={styles.featuresGrid}>
          {features.map((f, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.cardIconWrapper}>
                <Image src={f.icon} alt={f.title} width={48} height={48} />
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarFeatures;
