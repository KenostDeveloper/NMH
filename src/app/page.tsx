// pages/index.tsx
import PostsList from '@/components/PostsList';
import { Layout } from 'antd';
import Head from 'next/head';

export default function Home() {
  return (
    <div className='flex justify-center w-full'>
      <div className='container'>
        <PostsList />
      </div>
    </div>
  );
}