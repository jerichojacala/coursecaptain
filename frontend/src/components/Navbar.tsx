'use client';

import Link from 'next/link';
import useSWR from "swr";
import { fetcher } from "@/app/fetcher";

export default function Navbar() {
  const { data: user, error } = useSWR("/auth/users/me", fetcher);
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">CourseCaptain</div>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/schools" className="hover:underline">Schools</Link>
          <Link href="/courses" className="hover:underline">Courses</Link>
          <Link href="/professors" className="hover:underline">Professors</Link>
          {user ? (
            <span>Welcome, {user.username}</span>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
