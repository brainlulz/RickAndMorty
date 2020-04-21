import fetchCharacters from '../fetchCharacters';

describe('fetchCharacters should return a list of characters', () => {
  test('it should return all characters', async () => {
    const data = await fetchCharacters(1);
    expect(data.info.results).not.toBeNull();
  });
  test('it should return all characters from page 2', async () => {
    const data = await fetchCharacters(2);
    expect(data.info.next).toEqual('https://rickandmortyapi.com/api/character/?page=3');
  });
});
