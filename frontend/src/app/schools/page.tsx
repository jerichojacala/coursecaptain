'use client';

import Link from 'next/link';
import SearchGrid from '@/components/SearchGrid';

type School = {
  id: number;
  name: string;
  municipality: string;
  subdivision: string;
  country: string;
};

export default function SchoolSearchPage() {
  return (
    <SearchGrid<School>
      title="Schools"
      searchEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/schools/`}
      placeholder="Search schools by name, location, etc..."
      renderItem={(school) => (
        <Link
          href={`/schools/${school.id}`}
        >
          <h2 className="text-xl font-bold mb-2">{school.name}</h2>
          <p className="text-gray-600">{school.municipality}, {school.subdivision} {school.country}</p>
        </Link>
      )}
    />
  );
}
