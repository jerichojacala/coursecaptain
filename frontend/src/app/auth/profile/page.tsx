'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage({ id }: { id: string }) {
  const [data, setData] = useState<Profile | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile/${id}/`, { 
          cache: 'no-store' 
        });
        
        if (!res.ok) {
          setError(true);
          return;
        }
        
        const jsonData: Profile = await res.json();
        setData(jsonData);
      } catch (err) {
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    notFound();
  }

  if (!data) {
    return <div><p className='text-center'>Loading...</p></div>;
  }

  return (
    <div className="border-2 border-solid border-gray-800 p-8 max-w-6xl mx-auto">
      <div className="flex flex-row">
        <h1 className="text-3xl font-bold m-2">{data.name}</h1>
        <h1 className="text-gray-600 text-xl m-4 italic">{data.municipality}, {data.subdivision} {data.country}</h1>
        <a className="text-md m-5 hover:underline" href={data.url}>School Website</a>
      </div>

      <h1 className="text-2xl font-bold m-2">
        Metrics
      </h1>
      <div className="flex flex-row">
        <div className="basis-64 border-2 border-solid border-gray-800 m-2 p-2 rounded-lg">01</div>
        <div className="basis-64 border-2 border-solid border-gray-800 m-2 p-2 rounded-lg">02</div>
        <div className="basis-128 border-2 border-solid border-gray-800 m-2 p-2 rounded-lg">03</div>
      </div>
    </div>
  );
}