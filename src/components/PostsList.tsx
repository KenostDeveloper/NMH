'use client'
import { useEffect, useRef } from 'react';
import { Spin, Alert } from 'antd';
import PostCard from './PostCard';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types/post'; // Импортируем тип

const PostsList = () => {
  const { posts, isLoading, error, loadMorePosts, hasMore } = usePosts();
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMorePosts]);

  return (
    <div style={{ padding: 24 }}>
      {posts.map((post: Post) => <PostCard key={post.id} post={post} />)}
      
      <div ref={loaderRef} style={{ textAlign: 'center', padding: 20 }}>
        {isLoading && <Spin size="large" />}
        {!hasMore && <span>Больше нет постов</span>}
      </div>

      {error && <Alert message={error} type="error" showIcon />}
    </div>
  );
};

export default PostsList;