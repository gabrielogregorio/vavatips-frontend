import mockAllPosts from '@/mock/mockAllPosts.json';
import mockPosts from '@/mock/mockPosts.json';

describe('mockPosts', () => {
  it('should test resolve query', async () => {
    expect(mockPosts.posts).toHaveLength(10);

    expect(mockAllPosts.posts).toHaveLength(10);
    expect(mockAllPosts.count).toEqual(2);
    expect(mockAllPosts.tags).toHaveLength(0);
  });
});
