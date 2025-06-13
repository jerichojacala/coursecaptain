import SchoolDetailView from '@/components/SchoolDetail';

export default function SchoolPage({ params }: { params: { id: string } }) {
  return <SchoolDetailView id={params.id} />;
}