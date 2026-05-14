import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.css';
import { Blog } from '@/constants/blogs';

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, className }) => {
  return (
    <Link href={`/blogs/${blog.id}`} className={`${styles.card} ${className || ''}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className={styles.blogImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.title}>{blog.title}</p>
        <div className={styles.metaInfo}>
          <span className={styles.date}>{blog.date}</span>
          <span className={styles.tag}>{blog.tag}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
