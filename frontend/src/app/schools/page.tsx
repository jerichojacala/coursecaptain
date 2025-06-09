'use client';

import Banner from '@/components/Banner';
import { useEffect, useState } from 'react';

type Course = {
  id: number; // Django will auto-generate this
  professor: Professor;
  department: string;
  number: number;
  credits: number;
  subschool: string;
  college: string;
}



type Professor = {
  id: number;
  first_name: string;
  last_name: string;
  college: string;
}

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${API_URL}/courses/`;
  console.log('Fetching:', url);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/courses/')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error('Failed to fetch courses:', err));
  }, []);
  return (
    <>
      <Banner title="Courses" />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Available Courses</h1>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course.id} className="border p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">
                  {course.subschool} {course.department} {course.number}
                </h2>
                <p>Credits: {course.credits}</p>
                <p>College: {course.college}</p>
                <p>Professor: {course.professor.first_name} {course.professor.last_name}</p>
              </li>
            ))}
          </ul>
        )}
    </main>
    </>
  );
}