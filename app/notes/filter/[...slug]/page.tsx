import type { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Tags, type Tag } from '@/types/note';
import NotesClient from './Notes.client';

type Props = {
  params: { slug: string[] };
};

export const dynamicParams = false;
export const revalidate = 900;

export const generateStaticParams = async () => {
  return Tags.map((category) => ({ slug: [category] }));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug[0];
  const title = tag === 'All' ? 'All Notes | NoteHub' : `${tag} Notes | NoteHub`;
  const description = tag === 'All' ? 'Browse all notes on NoteHub.' : `Notes tagged with ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.example.com/notes/filter/${params.slug.join('/')}`,
      siteName: 'NoteHub',
      type: 'website',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      creator: 'github.com/Kovtoniuk-Oleh',
    },
  };
}

export default async function NotesFilterPage({ params }: Props) {
  const tag = params.slug[0];
  const category: Exclude<Tag, 'All'> | undefined = tag === 'All' ? undefined : (tag as Exclude<Tag, 'All'>);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, category }],
    queryFn: () => fetchNotes('', 1, undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} categories={Tags} />
    </HydrationBoundary>
  );
}
