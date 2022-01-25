import generateUrl from '../../core/helpers/UrlMount';

describe('resolveQuery', () => {
  it('should test resolve query', async () => {
    const [numberOfPage, urlBase, map, agent] = [198, 'postsBase', 'Ascent', 'Cypher'];
    expect(generateUrl(numberOfPage, urlBase, map, agent)).toEqual('/postsBase?map=Ascent&agent=Cypher&page=198');
  });
});
