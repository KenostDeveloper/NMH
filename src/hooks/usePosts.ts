import { useState, useEffect, useCallback } from 'react';
import { Post } from '@/types/post'; // Импортируем тип

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePosts = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`https://dummyjson.com/posts?limit=10&skip=${skip}`);
      const data = await res.json();
      
      setPosts(prev => [...prev, ...data.posts]);
      setSkip(prev => prev + data.posts.length);
      setHasMore(data.posts.length === 10);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [skip, hasMore, isLoading]);

  useEffect(() => {
    loadMorePosts();
  }, []);

  return { posts, isLoading, error, loadMorePosts, hasMore };
};