import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Blog uchun dummyjson.com posts API
const fetchPosts = async ({ queryKey }) => {
  const [, { page, limit }] = queryKey;
  const { data } = await axios.get(`https://dummyjson.com/posts`, {
    params: { limit: limit || 12, skip: ((page || 1) - 1) * (limit || 12) },
  });
  return {
    posts: data.posts?.map(p => ({
      id: p.id,
      title: p.title,
      excerpt: p.body?.slice(0, 120) + '...',
      content: p.body,
      author: `User ${p.userId}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: p.tags?.[0] || 'General',
      image: `https://picsum.photos/seed/${p.id}/800/400`,
      readTime: `${Math.floor(Math.random() * 8) + 3} daqiqa`,
      tags: p.tags || [],
      likes: p.reactions?.likes || 0,
      dislikes: p.reactions?.dislikes || 0,
    })) || [],
    total: data.total || 0,
  };
};

const fetchSinglePost = async (id) => {
  const { data } = await axios.get(`https://dummyjson.com/posts/${id}`);
  return {
    id: data.id,
    title: data.title,
    content: data.body,
    author: `User ${data.userId}`,
    date: new Date().toISOString().split('T')[0],
    category: data.tags?.[0] || 'General',
    image: `https://picsum.photos/seed/${data.id}/800/400`,
    tags: data.tags || [],
    likes: data.reactions?.likes || 0,
  };
};

export const useBlogPosts = (page = 1, limit = 12) => {
  return useQuery({
    queryKey: ['blogPosts', { page, limit }],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const useBlogPost = (id) => {
  return useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => fetchSinglePost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
