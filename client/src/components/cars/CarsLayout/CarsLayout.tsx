'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './CarsLayout.module.css';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import CarCard from '@/components/ui/CarCard/CarCard';
import { COLLECTION_DATA } from '@/constants/collection';

export default function CarsLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
  const [selectedBrand, setSelectedBrand] = useState<string | null>(searchParams.get('brand'));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  // Sync state with URL if URL changes externally
  useEffect(() => {
    const cat = searchParams.get('category');
    const brand = searchParams.get('brand');
    if (cat !== selectedCategory) setSelectedCategory(cat);
    if (brand !== selectedBrand) setSelectedBrand(brand);
  }, [searchParams]);

  const updateQueryParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/cars?${params.toString()}`, { scroll: false });
  };

  // Filtering logic
  const filteredCars = COLLECTION_DATA.filter(car => {
    const matchesCategory = !selectedCategory || (car as any).category === selectedCategory;
    const matchesBrand = !selectedBrand || car.brand === selectedBrand;
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];

    return matchesCategory && matchesBrand && matchesPrice;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setPriceRange([0, 100000]);
    setCurrentPage(1);
    router.replace('/cars', { scroll: false });
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <button
          className={styles.mobileFilterBtn}
          onClick={() => setIsSidebarOpen(true)}
        >
          Filters ⚙️
        </button>

        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h3>Filters</h3>
            <button className={styles.closeBtn} onClick={() => setIsSidebarOpen(false)}>✕</button>
          </div>
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={(cat) => { 
              setSelectedCategory(cat); 
              setCurrentPage(1); 
              updateQueryParam('category', cat);
            }}
            selectedBrand={selectedBrand}
            setSelectedBrand={(brand) => { 
              setSelectedBrand(brand); 
              setCurrentPage(1); 
              updateQueryParam('brand', brand);
            }}
            priceRange={priceRange}
            setPriceRange={(range) => { setPriceRange(range); setCurrentPage(1); }}
            onReset={handleReset}
          />
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />
        )}

        <main className={styles.mainContent}>
          <div className={styles.grid}>
            {paginatedCars.length > 0 ? (
              paginatedCars.map((car, index) => (
                <CarCard
                  key={`${car.id}-${index}`}
                  car={car}
                  className={styles.animEnter}
                />
              ))
            ) : (
              <div className={styles.noResults}>
                No cars found matching your filters.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                className={styles.pageBtn} 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i + 1}
                  className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                className={styles.pageBtn} 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
