import Link from 'next/link';

import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import Image from 'next/image';

export default async function HomePage() {
  const { reviews } = await getReviews(3);
  console.log(`[Home page rendering], ${reviews.map(review => review.slug)}`);

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className='pb-3'>Only the best indie games, reviewed for you</p>
      <ul className='flex flex-col gap-3'>
        {reviews.map(({ slug, image, title, subtitle }, index) => (
          <li
            className='border w-80 bg-white rounded hover:shadow-xl sm:w-full'
            key={slug}
          >
            <Link
              href={`/reviews/${slug}`}
              className='flex flex-col sm:flex-row'
            >
              <Image
                src={image}
                alt=''
                priority={index === 0}
                width='320'
                height='180'
                className=' rounded-t sm:rounded-l sm:rounded-r-none'
              />
              <div className='px-2 text-center py-1 sm:text-left'>
                <h2 className='font-orbitron  font-semibold '>{title}</h2>
                <p className='hidden sm:block pt-2'>{subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
