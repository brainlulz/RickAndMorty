import { API_URL } from '../constants';

export default async function fetchOneCharacter(type: string, page = 1) {
  const response = await fetch(
    `${API_URL}/character/?page=${page}&species=${type}`
  );
  return response.json();
}
