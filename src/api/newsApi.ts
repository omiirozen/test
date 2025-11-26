const API_KEY = "6f29bf13d61f4cdf99b659b6eb019a8f"; 
const PAGE_SIZE = 20;

export async function fetchNews(page: number, query?: string): Promise<any> {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    pageSize: PAGE_SIZE.toString(),
    page: page.toString(),
    country: "us"
  });

  if (query && query.trim()) {
    params.append("q", query.trim());
  }

  const url = `https://newsapi.org/v2/top-headlines?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to load news");
  }

  return res.json();
}
