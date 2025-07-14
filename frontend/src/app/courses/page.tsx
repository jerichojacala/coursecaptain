'use client';

//import statements

import Link from 'next/link';
import SearchGrid from '@/components/SearchGrid';
import { Course } from '@/models/courseModel';

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