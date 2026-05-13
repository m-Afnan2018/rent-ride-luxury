'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import Button from '@/components/ui/Button';
import { FOOTER_PAGES, FOOTER_POLICIES, FOOTER_SOCIALS, FOOTER_CONTACT } from '@/constants/footer';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Top CTA Section */}
        <div className={styles.topSection}>
          <h2 className={styles.topTitle}>
            Let's Start <br /> Journey
          </h2>
          <div className={styles.topContent}>
            <p className={styles.topText}>
              Discover world-class luxury rentals tailored for unforgettable journeys and premium experiences. 
              Whether for business, travel, or special occasions, our fleet brings sophistication and performance to every mile.
            </p>
            <Button variant="primary" size="lg">
              Contact Now
            </Button>
          </div>
        </div>

        {/* Bottom Footer Grid */}
        <div className={styles.bottomGrid}>
          
          {/* Column 1: Socials */}
          <div className={styles.column}>
            <h3 className={`${styles.columnTitle} ${styles.goldTitle}`}>Follow us</h3>
            <div className={styles.socialLinks}>
              {FOOTER_SOCIALS.map((social) => (
                <Link key={social.name} href={social.href} className={styles.socialIcon}>
                  <div className={styles.iconImage}>
                    <Image src={social.icon} alt={social.name} fill />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Contact */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Adress</h3>
            <p className={styles.addressText}>
              {FOOTER_CONTACT.address}
            </p>
            <h3 className={styles.columnTitle}>Call Us</h3>
            <div className={styles.contactInfo}>
              <a href={`tel:${FOOTER_CONTACT.phone.replace(/\s/g, '')}`} className={styles.contactLink}>
                {FOOTER_CONTACT.phone}
              </a>
              <a href={`mailto:${FOOTER_CONTACT.email}`} className={styles.contactLink}>
                {FOOTER_CONTACT.email}
              </a>
            </div>
          </div>

          {/* Column 3: Pages */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Pages</h3>
            <nav className={styles.linkList}>
              {FOOTER_PAGES.map((page) => (
                <Link key={page.name} href={page.href} className={styles.footerLink}>
                  {page.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Policies */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Our Policies</h3>
            <nav className={styles.linkList}>
              {FOOTER_POLICIES.map((policy) => (
                <Link key={policy.name} href={policy.href} className={styles.footerLink}>
                  {policy.name}
                </Link>
              ))}
            </nav>
          </div>

        </div>

      </div>
    </footer>
  );
}
