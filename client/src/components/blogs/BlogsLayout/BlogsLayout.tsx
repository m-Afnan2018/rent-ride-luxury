'use client';

import React, { useState } from 'react';
import styles from './BlogsLayout.module.css';
import { BLOGS_DATA, BLOG_TAGS } from '@/constants/blogs';
import BlogCard from '@/components/ui/BlogCard/BlogCard';

export default function BlogsLayout() {
  const [activeTag, setActiveTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Filter blogs
  const filteredBlogs = BLOGS_DATA.filter(blog => {
    if (activeTag === "All") return true;
    return blog.tag === activeTag;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Our Latest <span className={styles.highlight}>Blogs</span>
        </h1>
        <p className={styles.subtitle}>
          Stay updated with premium travel guides, luxury car trends, driving tips, and stories<br />
          designed for modern explorers and automotive enthusiasts.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <div className={styles.grid}>
            {paginatedBlogs.length > 0 ? (
              paginatedBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <div className={styles.noResults}>No blogs found for this tag.</div>
            )}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              {totalPages <= 5 ? (
                Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i + 1}
                    className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))
              ) : (
                <>
                  {[1, 2, 3].map(page => (
                    <button 
                      key={page}
                      className={`${styles.pageBtn} ${currentPage === page ? styles.activePage : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <span className={styles.pageDots}>...</span>
                  {[totalPages - 1, totalPages].map(page => (
                    <button 
                      key={page}
                      className={`${styles.pageBtn} ${currentPage === page ? styles.activePage : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </main>

        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>TAGS</h3>
          <div className={styles.tagsContainer}>
            {BLOG_TAGS.map(tag => (
              <button
                key={tag}
                className={`${styles.tagBtn} ${activeTag === tag ? styles.activeTagBtn : ''}`}
                onClick={() => {
                  setActiveTag(tag);
                  setCurrentPage(1);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
