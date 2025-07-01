'use client';

import Link from 'next/link';
import SearchGrid from '@/components/SearchGrid';

type Professor = {
  id: number;
  first_name: string;
  last_name: string;
  school: string;
};

export default function ProfessorSearchPage() {
    return (
    <SearchGrid<Professor>
      title="Professors"
      searchEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/professors/`}
      placeholder="Search professors by name, school, etc..."
      renderItem={(professor) => (
        <Link
          href={`/professors/${professor.id}`}
          className="border p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-bold mb-2">{professor.first_name} {professor.last_name}</h2>
          <p className="text-gray-600">{professor.school}</p>
        </Link>
      )}
    />
  );
}