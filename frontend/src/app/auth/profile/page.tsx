'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import {Profile} from '@/models/profileModel'
import useSWR, { mutate } from "swr";
import { fetcher } from "@/app/fetcher";
import {Schedule} from '@/models/scheduleModel';
import {Registration} from '@/models/registrationModel';

export default function ProfilePage() {
  const { data: user, error } = useSWR("/auth/users/me/", fetcher);
  if (!user){
    return <p>Loading...</p>
  }
  return (
    <>
      <div className="border-2 border-solid border-gray-800 p-8 max-w-6xl mx-auto">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold m-2">Welcome, {user?.username}.</h1>
          <h1 className="text-gray-600 text-xl m-4 italic">{user?.student_profile.first_name} {user?.student_profile.last_name}</h1>
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
      {user?.student_profile?.schedules?.length ? (
        <ul>
          {user.student_profile.schedules.map((schedule: Schedule) => (
            <div key={schedule.id} className="border-2 border-solid border-gray-800 p-8 max-w-6xl mx-auto">
            <h1>{schedule.title}</h1>
            {schedule.registrations.map((registration: Registration) => (
              <div key={registration.id}>
                <p>{registration.course.department} {registration.course.number}</p>
              </div>
            ))}
            </div>
          ))}
        </ul>
      ) : (
        <div className="border-2 border-solid border-gray-800 p-8 max-w-6xl mx-auto">
          <p className="text-center">No schedules</p>
        </div>
      )}
    </>
  );
}