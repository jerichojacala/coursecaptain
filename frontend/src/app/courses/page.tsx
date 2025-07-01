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
  school: School;
}

type Professor = {
  id: number;
  first_name: string;
  last_name: string;
  school: string;
}

type School = {
  id: number;
  name: string;
  municipality: string;
  subdivision: string;
  country: string;
};

export default function CourseSearchPage() {
  return (
    <SearchGrid<Course>
      title="Courses"
      searchEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/courses/`}
      placeholder="Search courses by name, professor, etc..."
      renderItem={(course) => (
        <Link
          href={`/courses/${course.id}`}
        >
          <h2 className="text-xl font-bold mb-2">{course.department} {course.number}</h2>
          <p className="text-gray-600">{course.professor.first_name} {course.professor.last_name}, {course.school.name}</p>
        </Link>
      )}
    />
  );
}