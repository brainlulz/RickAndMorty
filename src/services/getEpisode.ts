export default async function getEpisode(url: string) {
  const response = await fetch(url);
  return response.json();
}
