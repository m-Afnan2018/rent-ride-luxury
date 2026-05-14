import React from 'react';
import { notFound } from 'next/navigation';
import { COLLECTION_DATA } from '@/constants/collection';
import CarHero from '@/components/cars/CarDetails/CarHero';
import CarFeatures from '@/components/cars/CarDetails/CarFeatures';
import FAQ from '@/components/home/faq/FAQ';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const car = COLLECTION_DATA.find(c => c.id === parseInt(id));
  return {
    title: car ? `${car.name} | Rent Ride Luxury` : 'Car Details',
  };
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const car = COLLECTION_DATA.find(c => c.id === parseInt(id));

  if (!car) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', position: 'relative', overflowX: 'hidden' }}>
      <CarHero car={car as any} />
      <CarFeatures car={car as any} />
      <FAQ />
    </main>
  );
}
