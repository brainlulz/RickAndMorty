import { API_URL } from '../constants';

export default async function getByName(name: string, page = 1) {
  const response = await fetch(
    `${API_URL}/character/?page=${page}&name=${name}`
  );
  return response.json();
}
