import CourseDetailView from '@/components/CourseDetail';

export default function CoursePage({ params }: { params: { id: string } }) {
  return <CourseDetailView id={params.id} />;
}