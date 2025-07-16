//src/models/reviewModel.ts

import {Student} from '@/models/studentModel';

export type Review = {
  id: number;
  student: Student;
  difficulty: number;
  satisfaction: number;
  grade: string;
  semester: string;
  year: number;
  notes: string;
  timestamp: string;
  title: string;
}