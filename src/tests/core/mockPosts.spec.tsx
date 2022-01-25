import { mockAllPosts, mockPosts } from '../mock/mockPosts';

describe('mockPosts', () => {
  it('should test resolve query', async () => {
    expect(mockPosts().posts).toHaveLength(10);

    expect(mockAllPosts().posts).toHaveLength(10);
    expect(mockAllPosts().count).toEqual(2);
    expect(mockAllPosts().tags).toHaveLength(0);
  });
});
