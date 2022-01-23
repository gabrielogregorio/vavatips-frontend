import { actionTypesHandlePosts } from '@/interfaces/posts';

const SAVE_POSTS = 'SAVE_POSTS';
const TESTED_POSTS = 'TESTED_POSTS';

export const getPostsSave = () => localStorage.getItem(SAVE_POSTS);
export const getPostsTested = () => localStorage.getItem(TESTED_POSTS);

const verifyValidArray = (posts: any) => {
  if (posts !== undefined && posts !== null && posts !== '') {
    return JSON.parse(posts);
  }
  return [];
};

const savePosts = (action: actionTypesHandlePosts, updatePosts: string[]) => {
  localStorage.setItem(action === 'save' ? SAVE_POSTS : TESTED_POSTS, JSON.stringify(updatePosts));
};

export const addNewPost = (postId: string, action: actionTypesHandlePosts) => {
  const posts = action === 'save' ? getPostsSave() : getPostsTested();
  let updatePosts: string[] = [];

  updatePosts = verifyValidArray(posts);

  if (!updatePosts.includes(postId)) {
    updatePosts.push(postId);
  }

  savePosts(action, updatePosts);
};

export const removePost = (postId: string, action: actionTypesHandlePosts) => {
  const posts = action === 'save' ? getPostsSave() : getPostsTested();
  let updatePosts: string[] = [];

  updatePosts = verifyValidArray(posts);

  if (updatePosts.includes(postId)) {
    updatePosts = updatePosts.filter((id) => id !== postId);
  }

  savePosts(action, updatePosts);
};
