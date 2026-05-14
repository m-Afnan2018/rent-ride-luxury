import React, { Suspense } from 'react';
import CarsLayout from '@/components/cars/CarsLayout/CarsLayout';
import FAQ from '@/components/home/faq/FAQ';

export const metadata = {
  title: 'Our Collection | Rent Ride Luxury',
  description: 'Explore our handpicked collection of luxury cars available for rent.',
};

export default function CarsPage() {
  return (
    <>
      <Suspense fallback={<div style={{ padding: '120px', textAlign: 'center', color: 'var(--foreground)' }}>Loading...</div>}>
        <CarsLayout />
      </Suspense>
      <FAQ />
    </>
  );
}
