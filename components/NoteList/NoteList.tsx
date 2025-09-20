'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';
import Link from 'next/link';
import { Loading } from 'notiflix';
import toast from 'react-hot-toast';
import css from './NoteList.module.css';
interface NoteListProps {
  notes: Note[];
  query?: string;
  page?: number;
}

export default function NoteList({ notes, query = '', page = 1 }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      Loading.remove();
      toast.success('Note successfully deleted!');
      queryClient.invalidateQueries({ queryKey: ['notes', query, page] });
    },
    onError: () => {
      Loading.remove();
      toast.error('Error occurred while deleting note!');
    },
  });

  const handleDelete = (id: string) => {
    Loading.hourglass();
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link className={css.button} style={{ backgroundColor: '#198754' }} href={`/notes/${id}`}>
              View details
            </Link>
            <button className={css.button} onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
