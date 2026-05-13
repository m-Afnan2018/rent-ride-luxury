'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setIsCategoriesOpen(false); // Reset dropdown when closing menu
  };

  const toggleCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* ... (Logo and Desktop Nav remain the same) */}
      <Link href="/" className={styles.logoContainer}>
        <div className={styles.logoTextContainer}>
          <div className={styles.logoTop}>RENT RIDE</div>
          <div className={styles.logoBottom}>LUXURY</div>
        </div>
      </Link>

      <ul className={styles.navLinks}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About Us</Link></li>
        <li className={styles.dropdown}>
          <span>Categories</span>
          <div className={styles.dropdownMenu}>
            <Link href="/category/mercedes" className={styles.dropdownItem}>Mercedes</Link>
            <Link href="/category/ford" className={styles.dropdownItem}>Ford Motor</Link>
            <Link href="/category/land-rover" className={styles.dropdownItem}>Land Rover</Link>
            <Link href="/category/tesla" className={styles.dropdownItem}>Tesla</Link>
          </div>
        </li>
        <li><Link href="/cars">Cars</Link></li>
        <li><Link href="/blogs">Blogs</Link></li>
        <li><Link href="/contact">Contact Us</Link></li>
      </ul>

      <div className={styles.navActions}>
        <Button variant="primary" rounded="md" leftIcon={<WhatsApIcon />}>WhatsApp</Button>
        <Button variant="outline" rounded="md" leftIcon={<CallIcon />}>Call Us</Button>
      </div>

      <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
        <div className={`${styles.bar} ${isMenuOpen ? styles.bar1Open : ''}`}></div>
        <div className={`${styles.bar} ${isMenuOpen ? styles.bar2Open : ''}`}></div>
        <div className={`${styles.bar} ${isMenuOpen ? styles.bar3Open : ''}`}></div>
      </button>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link href="/about" onClick={toggleMenu}>About Us</Link></li>
          <li className={styles.mobileDropdown}>
             <div className={styles.mobileDropdownLabel} onClick={toggleCategories}>
                Categories
                <svg 
                  className={`${styles.arrow} ${isCategoriesOpen ? styles.arrowRotate : ''}`} 
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
             </div>
             <div className={`${styles.mobileDropdownItems} ${isCategoriesOpen ? styles.mobileDropdownItemsOpen : ''}`}>
                <Link href="/category/mercedes" onClick={toggleMenu}>Mercedes</Link>
                <Link href="/category/ford" onClick={toggleMenu}>Ford Motor</Link>
                <Link href="/category/land-rover" onClick={toggleMenu}>Land Rover</Link>
                <Link href="/category/tesla" onClick={toggleMenu}>Tesla</Link>
             </div>
          </li>
          <li><Link href="/cars" onClick={toggleMenu}>Cars</Link></li>
          <li><Link href="/blogs" onClick={toggleMenu}>Blogs</Link></li>
          <li><Link href="/contact" onClick={toggleMenu}>Contact Us</Link></li>
        </ul>
        <div className={styles.mobileActions}>
            <Button variant="primary" rounded="md" fullWidth leftIcon={<WhatsApIcon />}>WhatsApp</Button>
            <Button variant="outline" rounded="md" fullWidth leftIcon={<CallIcon />}>Call Us</Button>
        </div>
      </div>
    </nav>
  );
}

const WhatsApIcon = () => {
    return (
        <Image src="/icons/whatsapp-fill.png" alt="WhatsApp" width={20} height={20} />
    );
}

const CallIcon = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}