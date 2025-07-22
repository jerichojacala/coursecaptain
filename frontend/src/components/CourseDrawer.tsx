import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { useDebounce } from 'use-debounce';
import {Course} from '@/models/courseModel';
import {createRegistration} from '@/app/auth/utils';

export default function CourseDrawer({ scheduleId }: { scheduleId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [results, setResults] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm] = useDebounce(searchTerm, 300);
  const [isLoading, setIsLoading] = useState(false);
  const { data: courses } = useSWR(`/api/courses/`, fetcher);
  const searchEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/courses/`
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
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
      >
        Add Course
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
          <Dialog.Panel className="bg-black rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            <Dialog.Title className="text-lg font-bold mb-4">Add Course to Schedule</Dialog.Title>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className="space-y-2">
              {isLoading ? (
                <p className="text-center py-8">Searching...</p>
              ) : results.length === 0 && debouncedTerm ? (
                <p className="text-center text-lg italic py-8 text-gray-500">
                    No results found for "{debouncedTerm}"
                </p>
              ) : null}
              {results.map((course: any) => (
                <div
                  key={course.id}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded hover:bg-gray-50"
                >
                    <p className="text-white font-semibold">{course.department} {course.number}</p>
                    <p className="text-sm text-white-500">{course.professor.first_name} {course.professor.last_name}</p>
                  <button
                    onClick={() => createRegistration(scheduleId, course.id)}
                    className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
