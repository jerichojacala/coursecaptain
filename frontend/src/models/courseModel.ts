//src/models/courseModel.ts

import { Professor } from "@/models/professorModel";
import { School } from "@/models/schoolModel";
import {Subschool} from '@/models/subschoolModel';
import {Review} from '@/models/reviewModel';

export type Course = {
  id: number;
  professor: Professor;
  department: string;
  number: number;
  credits: number;
  subschool: Subschool;
  school: School;
  course_load: number;
  course_satisfaction: number;
  reviews: Review[];
}