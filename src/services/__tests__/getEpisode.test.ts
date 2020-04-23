import getEpisode from '../getEpisode';

describe('getEpisode should return episodes infos', () => {
  test('it should return episodes infos based on an URL', async () => {
    const URL = 'https://rickandmortyapi.com/api/episode/10';
    const data = await getEpisode(URL);
    expect(data.id).toEqual(10);
  });
});
