import getBySpecies from '../getBySpecies';

describe('getBySpecies should return a list of characters matching the species searched', () => {
  test('it should return a list of characters based on the species', async () => {
    const Species = 'Human';
    const data = await getBySpecies(Species);
    data.results.forEach((result) => {
      expect(
        result.species === 'Human' || result.species === 'Humanoid'
      ).toBeTruthy();
    });
  });
  test('it should return a character matching the species searched and correct page number', async () => {
    const Species = 'Alien';
    const data = await getBySpecies(Species, 2);
    expect(data.info.next).toEqual(
      `https://rickandmortyapi.com/api/character/?page=3&species=${Species}`
    );
  });
});
