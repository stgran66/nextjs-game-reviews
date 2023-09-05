import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';

export const metadata = {
  title: 'Reviews',
};

export default async function ReviewsPage() {
  const reviews = await getReviews(6);

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className='flex flex-row flex-wrap gap-3'>
        {reviews.map((review, index) => {
          return (
            <li
              className='border w-80 bg-white rounded hover:shadow-xl'
              key={review.slug}
            >
              <Link href={`/reviews/${review.slug}`}>
                <Image
                  src={review.image}
                  alt=''
                  priority={index === 0}
                  width='320'
                  height='180'
                  className=' rounded-t'
                />
                <h2 className='font-orbitron py-1 text-center font-semibold'>
                  {review.title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
