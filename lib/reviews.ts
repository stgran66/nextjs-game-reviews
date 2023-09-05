import { readFile, readdir } from 'node:fs/promises';
import { marked } from 'marked';
import matter from 'gray-matter';

export async function getReview(slug: string) {
  const text = await readFile(`./content/${slug}.md`, 'utf8');
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content);

  return { slug, title, date, image, body };
}

export async function getReviews() {
  const slugs = await getSlugs();
  const reviews = [];
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }
  reviews.sort((a, b) => b.date.localeCompare(a.date));
  return reviews;
}

export async function getSlugs() {
  const files = await readdir('./content/');
  const slugs = files
    .filter(file => file.endsWith('.md'))
    .map(file => file.slice(0, -'.md'.length));

  return slugs;
}

// Featured review is the latest one
export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}
