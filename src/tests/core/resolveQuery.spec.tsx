import resolveQuery from '@/helpers/resolveQuery';

describe('resolveQuery', () => {
  it('should test resolve query', async () => {
    expect(
      resolveQuery('/posts', {
        idPosts: 'idPost123',
        agent: 'agentChoice',
        map: 'mapChoice',
        page: 'pageChoice',
        filters: 'filtersList,filterList2',
      }),
    ).toEqual(
      '/posts?idPosts=idPost123&agent=agentChoice&map=mapChoice&page=pageChoice&filters=filtersList,filterList2',
    );
  });

  it('should test resolve query with undefined params', async () => {
    expect(
      resolveQuery('/user', {
        idPosts: '',
        agent: 'agentChoice',
        map: 'mapChoice',
        page: undefined,
        filters: 'filtersList,filterList2',
      }),
    ).toEqual('/user?idPosts=&agent=agentChoice&map=mapChoice&page=&filters=filtersList,filterList2');
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
