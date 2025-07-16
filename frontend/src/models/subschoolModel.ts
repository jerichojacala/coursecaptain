//src/models/subschoolModel.ts

import { School } from '@/models/schoolModel';

export type Subschool = {
    id: number;
    school: School;
    name: string;
    abbreviation: string;
    url: string;
}