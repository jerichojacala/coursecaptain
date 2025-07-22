'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import {Profile} from '@/models/profileModel'
import useSWR, { mutate } from "swr";
import { fetcher } from "@/app/fetcher";
import {Schedule} from '@/models/scheduleModel';
import {Registration} from '@/models/registrationModel';
import {createSchedule, deleteSchedule, updateSchedule} from '@/app/auth/utils';
import ScheduleCard from '@/components/ScheduleCard';


export default function ProfilePage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const { data: user, error } = useSWR("/auth/users/me/", fetcher);
  const handleAddSchedule = async () => {
    try {
      await createSchedule("My Schedule");
      mutate("/auth/users/me/"); // re-fetch user data to include new schedule
    } catch (err) {
      console.error("Failed to add schedule:", err);
      alert("Error adding schedule.");
    }
  };

  const handleDeleteSchedule = async (scheduleId: number) => {
    try {
      await deleteSchedule(scheduleId);
      mutate("/auth/users/me/");
    } catch (err) {
      console.error("Failed to delete schedule:", err);
      alert("Error deleting schedule.");
    }
  };

  const handleEditClick = (scheduleId: number, currentTitle: string) => {
    setEditingId(scheduleId);
    setNewTitle(currentTitle);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewTitle("");
  };

  const handleSaveTitle = async (scheduleId: number) => {
    try {
      // Call your backend API to update the schedule title
      await updateSchedule(scheduleId, newTitle);  // implement this API
      mutate("/auth/users/me/"); // refresh user data
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update title:", err);
      alert("Error updating title.");
    }
  };

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
          user.student_profile.schedules.map((schedule: Schedule) => (
            <ScheduleCard
              key={`schedule-${schedule.id}`}
              schedule={schedule}
              editingId={editingId}
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              handleSaveTitle={handleSaveTitle}
              handleCancelEdit={handleCancelEdit}
              handleEditClick={handleEditClick}
            />
          ))
      ) : (
        <div className="border-2 border-solid border-gray-800 p-8 max-w-6xl mx-auto">
          <p className="text-center">No schedules</p>
        </div>
      )}
      <div className="border-2 border-solid border-gray-800 p-8 max-w-6xl mx-auto">
          <button
            onClick={handleAddSchedule}
            className="bg-blue-600 text-white px-4 py-2 rounded h-fit self-start mt-4"
          >
            + Add Schedule
          </button>
      </div>
    </>
  );
}