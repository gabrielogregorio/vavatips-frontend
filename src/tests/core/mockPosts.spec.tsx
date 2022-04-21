import mockAllPosts from '@/mock/mockAllPosts.json';
import mockPosts from '@/mock/mockPosts.json';

const LENGTH_POSTS_MOCK = 10;
const LENGTH_TAGS_MOCK = 0;
const LENGTH_POSTS_COUNTS_MOCKS = 2;

describe('mockPosts', () => {
  it('should test resolve query', async () => {
    expect(mockPosts.posts).toHaveLength(LENGTH_POSTS_MOCK);

    expect(mockAllPosts.posts).toHaveLength(LENGTH_POSTS_MOCK);
    expect(mockAllPosts.count).toEqual(LENGTH_POSTS_COUNTS_MOCKS);
    expect(mockAllPosts.tags).toHaveLength(LENGTH_TAGS_MOCK);
  });
});
