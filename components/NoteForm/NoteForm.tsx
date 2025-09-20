'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import { Tags, NewNoteData } from '@/types/note';
import * as Yup from 'yup';
import { Loading } from 'notiflix';
import toast from 'react-hot-toast';
import css from './NoteForm.module.css';

interface NoteFormProps {
  categories: Tags;
}

export default function NoteForm({ categories }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const onCancel = () => router.back();

  const formSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be less or equal to 50 characters')
      .required('Title is required'),
    content: Yup.string()
      .max(500, 'Content must be less or equal to 500 characters')
      .required('Content is required'),
    tag: Yup.string().oneOf(categories).required('Tag is required'),
  });

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/All');
      toast.success('Note has been successfully created!');
    },
    onError: () => {
      toast.error('Error occurred while creating note!');
    },
  });

  const onFormSubmit = async (formData: FormData) => {
    Loading.hourglass();
    try {
      const values = Object.fromEntries(formData.entries());
      const validated = await formSchema.validate(values, { abortEarly: false });
      setErrors({});
      mutate(validated as NewNoteData); // ← тут ми явно кажемо TypeScript, що Yup вже все перевірив
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    } finally {
      Loading.remove();
    }
  };

  return (
    <form action={onFormSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={draft.title}
          onChange={handleChange}
          className={css.input}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={8}
          defaultValue={draft.content}
          onChange={handleChange}
          className={css.textarea}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select name="tag" id="tag" value={draft.tag} onChange={handleChange} className={css.select}>
          {categories
            .filter((tag) => tag !== 'All')
            .map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
