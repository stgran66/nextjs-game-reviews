import 'server-only';
import { marked } from 'marked';
import axios from 'axios';

const API_URL = process.env.API_URL;

interface Review {
  slug: string;
  title: string;
  date: string;
  image: string;
  subtitle: string;
  createdAt: string;
}

interface FullReview extends Review {
  body: string;
}

interface SearchableReview {
  slug: string;
  title: string;
}

interface PaginatedReviews {
  pageCount: number;
  reviews: Review[];
}

export const CACHE_TAG_REVIEWS = 'reviews';

export async function getReview(slug: string): Promise<FullReview> {
  const data = await fetchReview(slug);

  if (!data) {
    return null;
  }

  return { ...data, body: marked(data.body) };
}

export async function getReviews(
  pageSize: number,
  page?: number
): Promise<PaginatedReviews> {
  const response = await fetchReviews(pageSize, page);
  return { reviews: response.paginatedReviews, pageCount: response.pageCount };
}

export async function getSlugs(): Promise<string[]> {
  const { paginatedReviews } = await fetchReviews();
  return paginatedReviews.map(item => item.slug);
}

export async function searchReviews(
  query: string,
  pageSize: number
): Promise<SearchableReview[] | []> {
  const reviews = await filterReviews(query, pageSize);
  return reviews;
}

async function fetchReviews(pageSize?: number, page?: number) {
  const url = `${API_URL}/reviews?`;
  const response = await axios.get(url, {
    params: { perPage: pageSize, page },
  });

  if (response.statusText !== 'OK') {
    throw new Error(`API returned ${response.status} for ${url}`);
  }

  return await response.data;
}

async function filterReviews(query: string, pageSize: number) {
  const url = `${API_URL}/reviews/search`;
  const response = await axios.get(url, {
    params: { query, pageSize },
  });

  if (response.statusText !== 'OK') {
    throw new Error(`API returned ${response.status} for ${url}`);
  }

  return await response.data;
}

async function fetchReview(slug) {
  const url = `${API_URL}/reviews/${slug}`;

  const response = await axios.get(url);

  if (response.statusText !== 'OK') {
    throw new Error(`API returned ${response.status} for ${url}`);
  }
  return await response.data;
}
