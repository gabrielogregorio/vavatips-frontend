import { actionTypesHandlePosts } from '@/types/posts';

const SAVE_POSTS = 'SAVE_POSTS';
const TESTED_POSTS = 'TESTED_POSTS';

export const getPostsSave = () => localStorage.getItem(SAVE_POSTS);
export const getPostsTested = () => localStorage.getItem(TESTED_POSTS);

const verifyValidArray = (posts: string): string[] => {
  if (posts !== undefined && posts !== null && posts !== '') {
    return JSON.parse(posts);
  }
  return [];
};

const savePosts = (action: actionTypesHandlePosts, updatePosts: string[]) => {
  localStorage.setItem(action === 'save' ? SAVE_POSTS : TESTED_POSTS, JSON.stringify(updatePosts));
};

const getStatePosts = (action: 'test' | 'save') => {
  const posts = action === 'save' ? getPostsSave() : getPostsTested();
  return verifyValidArray(posts);
};

export const addNewPost = (postId: string, action: actionTypesHandlePosts) => {
  const updatePosts = getStatePosts(action);

  if (!updatePosts.includes(postId)) {
    updatePosts.push(postId);
  }

  savePosts(action, updatePosts);
};

export const removePost = (postId: string, action: actionTypesHandlePosts) => {
  let updatePosts = getStatePosts(action);

  if (updatePosts.includes(postId)) {
    updatePosts = updatePosts.filter((postIdLocal) => postIdLocal !== postId);
  }

  savePosts(action, updatePosts);
};
