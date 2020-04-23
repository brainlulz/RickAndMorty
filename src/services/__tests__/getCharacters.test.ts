import getCharacters from '../getCharacters';

describe('getCharacters should return a list of characters', () => {
  test('it should return all characters', async () => {
    const data = await getCharacters(1);
    expect(data.results).not.toBeNull();
  });
  test('it should return all characters from page 2', async () => {
    const data = await getCharacters(2);
    expect(data.info.next).toEqual(
      'https://rickandmortyapi.com/api/character/?page=3'
    );
  });
});
