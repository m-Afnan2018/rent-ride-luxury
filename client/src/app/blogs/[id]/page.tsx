import React from 'react';
import { notFound } from 'next/navigation';
import { BLOGS_DATA } from '@/constants/blogs';
import BlogDetails from '@/components/blogs/BlogDetails/BlogDetails';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const blog = BLOGS_DATA.find(b => b.id === parseInt(id));
  return {
    title: blog ? `${blog.title} | Rent Ride Luxury` : 'Blog Details',
  };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const blog = BLOGS_DATA.find(b => b.id === parseInt(id));

  if (!blog) {
    notFound();
  }

  return (
    <main>
      <BlogDetails blog={blog} />
    </main>
  );
}
