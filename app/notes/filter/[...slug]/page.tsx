import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Tags, type Tag } from '@/types/note';
import NotesClient from './Notes.client';

export const dynamicParams = false;
export const revalidate = 900;

export const generateStaticParams = async () => {
  return Tags.map((category) => ({ slug: [category] }));
};

export default async function NotesFilter({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  const first = slug[0];

  const category: Exclude<Tag, 'All'> | undefined =
    first === 'All' ? undefined : (first as Exclude<Tag, 'All'>);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, category }],
    queryFn: () => fetchNotes('', 1, undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient categories={Tags} category={category} />
    </HydrationBoundary>
  );
}
