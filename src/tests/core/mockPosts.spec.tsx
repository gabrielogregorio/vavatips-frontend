import mockAllPosts from '@/mock/mockAllPosts.json';
import mockPosts from '@/mock/mockPosts.json';

const QUANTITY_POSTS = 10;
const QUANTITY_POSTS_COUNT = 2;
const QUANTITY_POSTS_TAGS = 0;

describe('mockPosts', () => {
  it('should test resolve query', async () => {
    expect(mockPosts.posts).toHaveLength(QUANTITY_POSTS);

    expect(mockAllPosts.posts).toHaveLength(QUANTITY_POSTS);
    expect(mockAllPosts.count).toEqual(QUANTITY_POSTS_COUNT);
    expect(mockAllPosts.tags).toHaveLength(QUANTITY_POSTS_TAGS);
  });
});
