import DetailView from '@/components/Detail';

type School = {
  id: number;
  name: string;
  location: string;
  // Add other fields as needed
};

export default function SchoolPage({ params }: { params: { id: string } }) {
  return (
    <DetailView<School>
      id={params.id}
      endpoint={`${process.env.NEXT_PUBLIC_API_URL}/schools`}
      renderItem={(school) => (
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{school.name}</h1>
          <p className="text-gray-600 mb-6">{school.location}</p>
          <div className="prose max-w-none">
            {/* Add more school details here */}
          </div>
        </div>
      )}
    />
  );
}
