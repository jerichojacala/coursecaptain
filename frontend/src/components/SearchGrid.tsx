'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useDebounce } from 'use-debounce';
import Banner from '@/components/Banner';

type SearchGridProps<T> = {
  title: string;
  searchEndpoint: string;
  renderItem: (item: T) => ReactNode;
  placeholder?: string;
};

export default function SearchGrid<T>({
  title,
  searchEndpoint,
  renderItem,
  placeholder = 'Search...',
}: SearchGridProps<T>) {
  const [results, setResults] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm] = useDebounce(searchTerm, 300);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${searchEndpoint}?search=${debouncedTerm}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(`Failed to fetch results from ${searchEndpoint}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedTerm) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [debouncedTerm, searchEndpoint]);

  return (
    <>
      <Banner title={title} />
      <div className="p-8">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {isLoading ? (
          <p className="text-center py-8">Searching...</p>
        ) : results.length === 0 && debouncedTerm ? (
          <p className="text-center text-lg italic py-8 text-gray-500">
            No results found for "{debouncedTerm}"
          </p>
        ) : null}

        {results.map((item, idx) => (
          <div key={idx} className="border p-6 rounded-lg shadow hover:shadow-md transition">
            {renderItem(item)}
          </div>
        ))}

      </div>
    </>
  );
}
