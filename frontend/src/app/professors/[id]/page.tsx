import ProfessorDetailView from '@/components/ProfessorDetail';

export default function ProfessorPage(props: any) {
  return <ProfessorDetailView id={props.params.id} />;
}
