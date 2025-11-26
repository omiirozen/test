import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { NewsResponse } from "../../types/news";

const API_KEY = "6f29bf13d61f4cdf99b659b6eb019a8f"; 
const PAGE_SIZE = 20;

interface GetNewsArg {
  page: number;
  query?: string | null;
}

export const newsApiSlice = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://newsapi.org/v2" 
  }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, GetNewsArg>({
      query: ({ page, query }) => {
        const params = new URLSearchParams({
          apiKey: API_KEY,
          pageSize: PAGE_SIZE.toString(),
          page: page.toString(),
          country: "us"
        });

        if (query && query.trim()) {
          params.append("q", query.trim());
        }

        return `/top-headlines?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetNewsQuery } = newsApiSlice;