//src/models/professorModel.ts

import { School } from '@/models/schoolModel';

export type Professor = {
  id: number;
  first_name: string;
  last_name: string;
  school: School;
}