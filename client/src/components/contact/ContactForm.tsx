'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay / debounce
    setTimeout(() => {
      console.log('Form Submitted Successfully:', formData);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', source: '' }); // Reset form
      alert('Thank you! Your message has been received.');
    }, 1500);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.contactCard}>

          {/* Gold Panel Background on the right */}
          <div className={styles.goldPanel}></div>

          <div className={styles.contentGrid}>

            {/* Left Side: Form Content */}
            <div className={styles.formSide}>
              <h2 className={styles.title}>
                Get. in <span className={styles.accent}>Touch</span>
              </h2>

              <p className={styles.description}>
                Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name *" 
                    className={styles.input} 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" 
                    className={styles.input} 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number *" 
                    className={styles.input} 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <select 
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className={styles.input} 
                    required
                  >
                    <option value="" disabled hidden>How did you find us?</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend / Referral</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'SENDING...' : 'SEND'}
                </button>
              </form>

              <div className={styles.contactInfoRow}>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <Image src="/icons/phone_icon.svg" alt="Phone" width={24} height={24} />
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>PHONE</span>
                    <span className={styles.infoValue}>03 5432 1234</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <Image src="/icons/fax_icon.svg" alt="Fax" width={24} height={24} />
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>FAX</span>
                    <span className={styles.infoValue}>03 5432 1234</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <Image src="/icons/email_icon.svg" alt="Email" width={24} height={24} />
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>EMAIL</span>
                    <span className={styles.infoValue}>info@marx.com</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Side: Map Image */}
            <div className={styles.mapSide}>
              <div className={styles.mapWrapper}>
                <Image
                  src="/images/contact-map.png"
                  alt="Location Map"
                  fill
                  className={styles.mapImage}
                />
                <div className={styles.mapMarker}>
                  <Image src="/icons/el_map-marker.svg" alt="Map Marker" width={40} height={40} />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
