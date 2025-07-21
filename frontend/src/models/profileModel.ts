import {Schedule} from '@/models/scheduleModel';

export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  schedules: Schedule[];
}