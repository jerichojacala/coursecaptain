import DetailView from '@/components/Detail';

export default function SchoolPage({ params }: { params: { id: string } }) {
  return <DetailView id={params.id} />;
}