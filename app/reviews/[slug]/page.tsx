import Image from 'next/image';
import { notFound } from 'next/navigation';

import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { getReview, getSlugs } from '@/lib/reviews';

interface ReviewPageProps {
  params: { slug: string };
}
export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: ReviewPageProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  const { title, body, image, subtitle, createdAt } = review;

  return (
    <>
      <Heading>{title}</Heading>
      <p className='font-semibold pb-3'>{subtitle}</p>
      <div className='flex gap-3 items-baseline'>
        <p className='italic pb-2'>{createdAt}</p>
        <ShareLinkButton />
      </div>
      <Image
        unoptimized
        src={image}
        alt=''
        priority
        width='640'
        height='360'
        className='rounded mb-2'
      />
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className='prose prose-slate max-w-screen-sm'
      />
    </>
  );
}
