import 'server-only';
import qs from 'qs';
import { marked } from 'marked';

const CMS_URL = 'http://localhost:1337';

interface CmsItem {
  id: number;
  attributes: any;
}

interface Review {
  slug: string;
  title: string;
  date: string;
  image: string;
  subtitle: string;
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
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    populate: { image: { fields: ['url'] } },
    pagination: { pageSize: 1, withCount: false },
  });
  if (data.length === 0) {
    return null;
  }
  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body),
  };
}

export async function getReviews(
  pageSize: number,
  page?: number
): Promise<PaginatedReviews> {
  const { data, meta } = await fetchReviews({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize, page },
  });
  return {
    reviews: data.map(toReview),
    pageCount: meta.pagination.pageCount,
  };
}

export async function getSlugs(): Promise<string[]> {
  const { data } = await fetchReviews({
    fields: ['slug'],
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 100 },
  });
  return data.map(item => item.attributes.slug);
}

export async function searchReviews(
  query: string
): Promise<SearchableReview[] | []> {
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ['slug', 'title'],
    sort: ['title'],
    pagination: { pageSize: 5 },
  });
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

async function fetchReviews(params: any) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(params, { encodeValuesOnly: true });

  console.log(url);

  const response = await fetch(url, {
    next: {
      tags: [CACHE_TAG_REVIEWS],
    },
  });

  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }

  return await response.json();
}

function toReview(item: CmsItem): Review {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image.data.attributes.url,
    subtitle: attributes.subtitle,
  };
}
