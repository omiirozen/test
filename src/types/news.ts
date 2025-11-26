export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  author?: string;
  publishedAt: string;
}

export interface NewsResponse {
  articles: Article[];
  totalResults: number;
}
