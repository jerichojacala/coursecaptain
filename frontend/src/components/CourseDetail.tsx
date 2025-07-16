'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Course } from '@/models/courseModel';
import {Subschool} from '@/models/subschoolModel';
import {Review} from '@/models/reviewModel';


export default function CourseDetailView({ id }: { id: string }) {
  const [data, setData] = useState<Course | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}/`, { 
          cache: 'no-store' 
        });
        
        if (!res.ok) {
          setError(true);
          return;
        }
        
        const jsonData: Course = await res.json();
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
    <>
      <div className="border-2 border-solid border-gray-800 p-8 max-w-6xl mx-auto">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold m-2">{data.subschool.abbreviation} {data.department} {data.number}</h1>
          <h1 className="text-gray-600 text-xl m-4 italic">{data.professor.first_name} {data.professor.last_name}</h1>
          <Link
            href={`/schools/${data.school.id}`}
            className="text-gray-600 text-xl m-4 italic"
          >{data.school.name}</Link>
        </div>
      
        <h1 className="text-2xl font-bold m-2">
          Metrics
        </h1>
        <div className="flex flex-row">
          <div className="basis-64 border-2 border-solid border-gray-800 m-2 p-2 rounded-lg">Course Load: {data.course_load.toFixed(1)}</div>
          <div className="basis-64 border-2 border-solid border-gray-800 m-2 p-2 rounded-lg">Course Satisfaction: {data.course_satisfaction.toFixed(1)}</div>
          <div className="basis-128 border-2 border-solid border-gray-800 m-2 p-2 rounded-lg">03</div>
        </div>
      </div>
      <div className="border-2 border-solid border-gray-800 p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Reviews
        </h1>
        {data.reviews.map((review) => (
            <div key={review.id} className="border-2 border-solid border-gray-800 max-w-1/1 rounded-lg p-2">
              <h1 className="text-gray-800 text-xl">
                {review.title}
              </h1>
              <h1 className="text-gray-600 text-lg italic">
                {review.student.first_name} {review.student.last_name}
              </h1>
              <p>
                {review.notes}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}