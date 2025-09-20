// 'use client';

// import { useState } from 'react';
// import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import { useDebounce, useDebouncedCallback } from 'use-debounce';
// import { fetchNotes } from '@/lib/api';
// import { Tags, type Tag } from '@/types/note';
// import SearchBox from '@/components/SearchBox/SearchBox';
// import NoteList from '@/components/NoteList/NoteList';
// import NoteForm from '@/components/NoteForm/NoteForm';
// import Modal from '@/components/Modal/Modal';
// import Pagination from '@/components/Pagination/Pagination';
// import { Toaster } from 'react-hot-toast';
// import css from './Notes.module.css';

// interface NotesClientProps {
//   categories: Tags;
//   category: Exclude<Tag, 'All'> | undefined;
// }

// const NotesClient = ({ categories, category }: NotesClientProps) => {
//   const [query, setQuery] = useState<string>('');
//   const [debouncedQuery] = useDebounce(query, 300);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [page, setPage] = useState<number>(1);

//   const {
//     data: notes,
//     isSuccess,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['notes', { search: debouncedQuery, page, category }],
//     queryFn: () => fetchNotes(debouncedQuery, page, undefined, category),
//     refetchOnMount: false,
//     placeholderData: keepPreviousData,
//   });

//   const totalPages = notes?.totalPages ?? 1;

//   const onQueryChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setPage(1);
//     setQuery(e.target.value);
//   }, 300);

//   if (isLoading) return <p>Loading, please wait...</p>;
//   if (error || !notes) return <p>Could not fetch the list of notes. {error?.message}</p>;

//   const handleClose = () => {
//     setIsModalOpen(false);
//   };

//   const hasNotes = notes.notes.length > 0;

//   let emptyMessage: string;
//   const trimmedQuery = query.trim();

//   if (trimmedQuery) {
//     emptyMessage = category
//       ? `No notes match your search in the "${category}" category.`
//       : 'No results found for your query.';
//   } else if (category) {
//     emptyMessage = `There are no notes in the "${category}" category yet.`;
//   } else {
//     emptyMessage = 'There are no notes yet. Create the first one!';
//   }

//   return (
//     <div className={css.app}>
//       <Toaster />
//       <header className={css.toolbar}>
//         <SearchBox onChange={onQueryChange} />
//         {totalPages > 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage} />}
//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>
//       </header>

//       {isSuccess &&
//         (hasNotes ? <NoteList notes={notes.notes} /> : <p className={css.empty}>{emptyMessage}</p>)}

//       {isModalOpen && (
//         <Modal onClose={handleClose}>
//           <NoteForm categories={categories} onSubmit={handleClose} onCancel={handleClose} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default NotesClient;

'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { Tags, type Tag } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import { Toaster } from 'react-hot-toast';
import css from './Notes.module.css';

interface NotesClientProps {
  categories: Tags;
  category: Exclude<Tag, 'All'> | undefined;
}

const NotesClient = ({ categories, category }: NotesClientProps) => {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const {
    data: notes,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes', { search: debouncedQuery, page, category }],
    queryFn: () => fetchNotes(debouncedQuery, page, undefined, category),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const totalPages = notes?.totalPages ?? 1;

  // Використовуємо value з input для більш чистої обробки
  const onQueryChange = useDebouncedCallback((value: string) => {
    setPage(1);
    setQuery(value);
  }, 300);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !notes) return <p>Could not fetch the list of notes. {error?.message}</p>;

  const handleClose = () => setIsModalOpen(false);
  const hasNotes = notes.notes.length > 0;

  const trimmedQuery = query.trim();
  let emptyMessage: string;
  if (trimmedQuery) {
    emptyMessage = category
      ? `No notes match your search in the "${category}" category.`
      : 'No results found for your query.';
  } else if (category) {
    emptyMessage = `There are no notes in the "${category}" category yet.`;
  } else {
    emptyMessage = 'There are no notes yet. Create the first one!';
  }

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox onChange={(e) => onQueryChange(e.target.value)} />
        {totalPages > 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage} />}
        <button className={css.button} onClick={() => setIsModalOpen(true)} disabled={isLoading}>
          Create note +
        </button>
      </header>

      {isSuccess &&
        (hasNotes ? <NoteList notes={notes.notes} /> : <p className={css.empty}>{emptyMessage}</p>)}

      {isModalOpen && (
        <Modal onClose={handleClose}>
          <NoteForm categories={categories} onSubmit={handleClose} onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
