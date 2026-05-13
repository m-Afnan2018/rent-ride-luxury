import React from 'react';
import styles from './hero.module.css';

export default function Hero() {
    return (
        <section className={styles.heroSection}>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className={styles.videoBackground}
            >
                <source src="/video/hero_background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Gradient Overlay */}
            <div className={styles.overlay}></div>

            {/* Large Center Abstract Outline Logo */}
            <div className={styles.centerGraphic}>
                <img src="/icons/Union.png" alt="" />
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h1 className={styles.heading}>
                    Where Luxury <br />
                    Meets the <span className={styles.highlight}>Road</span>
                </h1>
                <p className={styles.description}>
                    From iconic supercars to executive sedans, elevate every ride with unmatched
                    sophistication and performance.
                </p>
            </div>
        </section>
    );
}
