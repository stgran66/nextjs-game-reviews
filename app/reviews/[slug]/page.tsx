import Heading from '@/components/Heading';
import { getReview, getSlugs } from '@/lib/reviews';

interface ReviewPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  const review = await getReview(slug);

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className='italic pb-2'>{review.date}</p>
      <img
        src={review.image}
        alt=''
        width='640'
        height='360'
        className='rounded mb-2'
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className='prose prose-slate max-w-screen-sm'
      />
    </>
  );
}
