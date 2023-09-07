'use client';

import { Combobox } from '@headlessui/react';
import { useIsClient } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchReviews } from '@/lib/reviews';

export default function SearchBox() {
  const isClient = useIsClient();
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (query.length > 1) {
      (async () => {
        const reviews = await searchReviews(query);
        setReviews(reviews);
      })();
    } else {
      setReviews([]);
    }
  }, [query]);

  const handleChange = review => {
    router.push(`/reviews/${review.slug}`);
  };

  if (!isClient) {
    return (
      <input placeholder='Search' className='border rounded py-1 px-2 w-48' />
    );
  }

  return (
    <div className='relative w-48'>
      <Combobox onChange={handleChange}>
        <Combobox.Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search'
          className='border rounded py-1 px-2 w-full'
        />
        <Combobox.Options className='absolute bg-white py-1 w-full'>
          {reviews.map(review => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? 'bg-orange-100' : ''
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
