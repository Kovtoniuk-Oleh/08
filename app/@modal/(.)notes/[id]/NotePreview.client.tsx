'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Could not fetch note. {error?.message}</p>;

  return (
    <Modal
      onClose={() => {
        router.back();
      }}
    >
      <div className={css.wrapper}>
        <button
          className={css.backBtn}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </button>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <p className={css.tag}>{note.tag}</p>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.updatedAt ?? note.createdAt}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
