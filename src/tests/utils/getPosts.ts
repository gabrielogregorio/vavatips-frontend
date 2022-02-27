import { posts } from '@/mock/mockPosts.json';

export const getTitle = (index: number) => posts[index].title;

export const getDescription = (index: number) => posts[index].description;
