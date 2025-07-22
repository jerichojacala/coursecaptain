import {Schedule} from '@/models/scheduleModel';
import { createSchedule, deleteSchedule } from '@/app/auth/utils';
import useSWR, { mutate } from "swr";

export default function ScheduleCard({
  schedule,
  editingId,
  newTitle,
  setNewTitle,
  handleSaveTitle,
  handleCancelEdit,
  handleEditClick
}: {
  schedule: Schedule;
  editingId: number | null;
  newTitle: string;
  setNewTitle: (title: string) => void;
  handleSaveTitle: (id: number) => void;
  handleCancelEdit: () => void;
  handleEditClick: (id: number, title: string) => void;
}) {

  return (
    <div key={`schedule-${schedule.id}`} className="border-2 border-solid border-gray-800 p-8 max-w-6xl mx-auto">
          
          {editingId === schedule.id ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border border-gray-400 px-2 py-1 rounded"
              />
              <button
                onClick={() => handleSaveTitle(schedule.id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <h1 className="text-xl font-bold">{schedule.title}</h1>
              <button
                onClick={() => handleEditClick(schedule.id, schedule.title)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </div>
          )}
    </div>
  );
}