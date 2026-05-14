import React from 'react';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  onReset: () => void;
}

const CATEGORIES = ['Sports', 'Suv', 'Sedan'];
const BRANDS = ['Mercedes', 'Tesla', 'Land Rover', 'Ford Motor Company'];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  onReset
}) => {
  return (
    <div className={styles.container}>
      {/* Categories */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categories</h3>
        <div className={styles.options}>
          {CATEGORIES.map((cat) => (
            <div 
              key={cat} 
              className={`${styles.option} ${selectedCategory === cat ? styles.active : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            >
              <span>{cat}</span>
              <div className={styles.radio}>
                <div className={styles.radioInner} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Brands</h3>
        <div className={styles.options}>
          {BRANDS.map((brand) => (
            <div 
              key={brand} 
              className={`${styles.option} ${selectedBrand === brand ? styles.active : ''}`}
              onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
            >
              <span>{brand}</span>
              <div className={styles.radio}>
                <div className={styles.radioInner} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Price</h3>
        <div className={styles.priceSliderWrapper}>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange[0]}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), priceRange[1] - 1000);
                setPriceRange([val, priceRange[1]]);
              }}
              className={`${styles.rangeInput} ${styles.minRange}`}
            />
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), priceRange[0] + 1000);
                setPriceRange([priceRange[0], val]);
              }}
              className={`${styles.rangeInput} ${styles.maxRange}`}
            />
            <div className={styles.sliderTrack}>
              <div 
                className={styles.sliderProgress} 
                style={{ 
                  left: `${(priceRange[0] / 100000) * 100}%`, 
                  right: `${100 - (priceRange[1] / 100000) * 100}%` 
                }} 
              />
            </div>
          </div>
          <div className={styles.priceRangeText}>
            ${priceRange[0].toLocaleString('en-US')} - ${priceRange[1].toLocaleString('en-US')}
          </div>
        </div>
      </div>

      <button className={styles.resetBtn} onClick={onReset}>
        Reset All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
