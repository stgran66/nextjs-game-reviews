import Link from 'next/link';

import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import Image from 'next/image';

export default async function HomePage() {
  const revies = await getReviews(3);

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className='pb-3'>Only the best indie games, reviewed for you</p>
      <ul className='flex flex-col gap-3'>
        {revies.map(({ slug, image, title }, index) => (
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
              <h2 className='font-orbitron py-1 text-center font-semibold sm:px-2'>
                {title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
