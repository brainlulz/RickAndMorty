import { API_URL } from '../constants';

export default async function getByName(name: string) {
  const response = await fetch(`${API_URL}/character/?name=${name}`);
  return response.json();
}
