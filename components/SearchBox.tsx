'use client';

import { Combobox } from '@headlessui/react';
import { useDebounce } from 'use-debounce';
import { useIsClient } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchReviews } from '@/lib/reviews';

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = '/api/search?query=' + encodeURIComponent(debouncedQuery);
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

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
