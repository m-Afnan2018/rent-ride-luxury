'use client';

import React from 'react';
import Image from 'next/image';
import styles from './BlogDetails.module.css';
import { BLOGS_DATA, BLOG_TAGS, Blog } from '@/constants/blogs';
import BlogCard from '@/components/ui/BlogCard/BlogCard';

interface BlogDetailsProps {
  blog: Blog;
}

export default function BlogDetails({ blog }: BlogDetailsProps) {
  const recentBlogs = BLOGS_DATA.slice(0, 3); // Get first 3 blogs for sidebar

  return (
    <div className={styles.container}>
      {/* Header matching the list page style */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>
            Our Latest <span className={styles.highlight}>Blogs</span>
          </h1>
          <div className={styles.headerMeta}>
            <span className={styles.headerTag}>{blog.tag}</span>
            <span className={styles.headerDate}>{blog.date}</span>
          </div>
        </div>
        <p className={styles.subtitle}>
          Stay updated with premium travel guides, luxury car trends, driving tips, and stories<br />
          designed for modern explorers and automotive enthusiasts.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <div className={styles.mainImageWrapper}>
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className={styles.mainImage}
              priority
            />
          </div>

          <article className={styles.article}>
            <h2 className={styles.articleTitle}>
              The most common business debate isn't as black and white as you might think
            </h2>
            
            <p className={styles.paragraph}>
              He moonlights difficult-engrossed, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to. Place voice no arises along to. Parlors waiting so against me no. Wishing calling is warrant settled was lucky. Express besides it present if at an opinion visitor. For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection favorable Mrs can be projecting own.
            </p>

            <ul className={styles.list}>
              <li>The standard chunk of Lorem Ipsum used since the 1500s.</li>
              <li>reproduced below for those interested.</li>
              <li>It is a long-established fact that a reader will.</li>
              <li>distracted by the readable content of a page when looking at its layout.</li>
            </ul>

            <p className={styles.paragraph}>
              Speedily say has suitable disposal add boy. On fourth doubt miles of child. Exercise joy man children rejoiced. Yet uncommonly his ten who diminution astonished. Demesne's new manners savings staying had. Under folly balls, death own point now men. Match way she avoids seeing death. She drifts their fat off.
            </p>

            {blog.youtube_link && (
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="100%"
                  src={blog.youtube_link}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                ></iframe>
              </div>
            )}

            <h3 className={styles.subtitle2}>
              Ten questions you should answer truthfully
            </h3>

            <p className={styles.paragraph}>
              Son agreed to others Exeter period myself few yet nature. Mention Mr manners opinion if garrets enabled. To occasional dissimilar impossible sentiments. Do fortune account written prepare invited no passage. Garrets use ten, you the weather venture friends. Solid visit seems again you nor all. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an.
            </p>
          </article>
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.recentBlogsSection}>
            <h3 className={styles.sidebarTitle}>Recent Blogs</h3>
            <div className={styles.recentBlogsList}>
              {recentBlogs.map(recentBlog => (
                <div key={recentBlog.id} className={styles.recentBlogCardWrapper}>
                   <BlogCard blog={recentBlog} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tagsSection}>
            <h3 className={styles.sidebarTitleTags}>TAGS</h3>
            <div className={styles.tagsContainer}>
              {BLOG_TAGS.map((tag, index) => (
                <button
                  key={tag}
                  className={`${styles.tagBtn} ${index === 0 ? styles.activeTagBtn : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
