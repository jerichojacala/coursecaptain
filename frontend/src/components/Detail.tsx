'use client';

import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

type DetailViewProps<T> = {
  id: string;
  endpoint: string;
  renderItem: (data: T) => ReactNode;
};

export default async function DetailView<T>({
  id,
  endpoint,
  renderItem,
}: DetailViewProps<T>) {
  const res = await fetch(`${endpoint}/${id}/`, { cache: 'no-store' });

  if (!res.ok) return notFound();

  const data: T = await res.json();

  return <>{renderItem(data)}</>;
}
