import {Registration} from '@/models/registrationModel';

export type Schedule = {
  id: number;
  student: number;
  title: string;
  registrations: Registration[];
  schedule_load: number;
  schedule_satisfaction: number;
}