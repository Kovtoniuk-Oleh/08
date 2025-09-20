import axios from 'axios';
import type { Note, Tag, NewNoteData } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

type SortBy = 'created' | 'updated';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 12,
  tag?: Tag,
  sortBy?: SortBy
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>('notes', {
    params: {
      search,
      page,
      perPage,
      tag,
      sortBy,
    },
  });
  return data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const { data } = await axios.post<Note>('notes', noteData);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`notes/${id}`);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`notes/${id}`);
  return data;
};
