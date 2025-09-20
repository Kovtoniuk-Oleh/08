import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNoteData } from '@/types/note';

interface NoteStore {
  draft: NewNoteData;
  setDraft: (draft: Partial<NewNoteData>) => void;
  clearDraft: () => void;
}

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) =>
        set((state) => ({
          draft: { ...state.draft, ...draft },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
