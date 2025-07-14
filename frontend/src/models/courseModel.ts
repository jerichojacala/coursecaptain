//src/models/courseModel.ts

import { Professor } from "@/models/professorModel";
import { School } from "@/models/schoolModel";

export type Course = {
  id: number;
  professor: Professor;
  department: string;
  number: number;
  credits: number;
  subschool: string;
  school: School;
}