'use client';

//import statements

import Link from 'next/link';
import SearchGrid from '@/components/SearchGrid';

//define types

type Course = {
  id: number; // Django will auto-generate this
  professor: Professor;
  department: string;
  number: number;
  credits: number;
  subschool: string;
  school: string;
}

type Professor = {
  id: number;
  first_name: string;
  last_name: string;
  school: string;
}

export default function CourseSearchPage() {
    return (
    <SearchGrid<Course>
      title="Courses"
      searchEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/courses/`}
      placeholder="Search courses by name, school, etc..."
      renderItem={(course) => (
        <Link
          href={`/courses/${course.id}`}
          className="border p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-bold mb-2">{course.department} {course.number}</h2>
          <p className="text-gray-600">{course.school}</p>
        </Link>
      )}
    />
  );
}