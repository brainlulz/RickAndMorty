import getByName from '../getByName';

describe('getByName should return a character based on the name searched', () => {
  test('it should return a character matching the name searched', async () => {
    const CharacterName = 'Beebo';
    const data = await getByName(CharacterName);
    expect(data.results[0].name).toEqual(CharacterName);
  });
  test('it should return a character matching the name searched and correct page number', async () => {
    const CharacterName = 'rick';
    const data = await getByName(CharacterName, 2);
    expect(data.info.next).toEqual(
      `https://rickandmortyapi.com/api/character/?page=3&name=${CharacterName}`
    );
  });
  test('it should return an error for unexistent character', async () => {
    const data = await getByName('IDontExist');
    expect(data.error).not.toBeNull();
  });
});
