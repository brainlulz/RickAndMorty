import { API_URL } from '../constants';

export default async function fetchOneCharacter(type: string) {
  const response = await fetch(`${API_URL}/character/?species=${type}`);
  return response.json();
}
