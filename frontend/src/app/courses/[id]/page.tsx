import CourseDetailView from '@/components/CourseDetail';
import type { Metadata } from 'next';

export default function CoursePage(props: any) {
  return <CourseDetailView id={props.params.id} />;
}
