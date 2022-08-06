import { resolveQuery } from '@/helpers/resolveQuery';

describe('resolveQuery', () => {
  it('should test resolve query', async () => {
    expect(
      resolveQuery('/posts', {
        agent: 'agentChoice',
        filters: 'filtersList,filterList2',
        idPosts: 'idPost123',
        map: 'mapChoice',
        page: 'pageChoice',
      }),
    ).toEqual(
      '/posts?agent=agentChoice&filters=filtersList,filterList2&idPosts=idPost123&map=mapChoice&page=pageChoice',
    );
  });

  it('should test resolve query with undefined params', async () => {
    expect(
      resolveQuery('/user', {
        agent: 'agentChoice',
        filters: 'filtersList,filterList2',
        idPosts: '',
        map: 'mapChoice',
        page: undefined,
      }),
    ).toEqual('/user?agent=agentChoice&filters=filtersList,filterList2&idPosts=&map=mapChoice&page=');
  });

  it('should test resolve query with none and null params', async () => {
    expect(
      resolveQuery('/user', {
        agentNow: 'agentChoice',
        pageNow: null,
      }),
    ).toEqual('/user?agentNow=agentChoice&pageNow=');
  });

  it('should test resolve query with none params', async () => {
    expect(resolveQuery('/UrlTest')).toEqual('/UrlTest');
  });
});
