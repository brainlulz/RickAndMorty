import { API_URL } from '../constants';


export default async function fetchCharacters(page = 1) {
  const response = await fetch(`${API_URL}/character/?page=${page}`);
  return response.json();
}
