'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">CourseCaptain</div>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/courses" className="hover:underline">Courses</Link>
          <Link href="/schools" className="hover:underline">Schools</Link>
        </div>
      </div>
    </nav>
  );
}
