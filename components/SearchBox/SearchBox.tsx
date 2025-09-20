'use client';

import { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      className={css.input}
      onChange={onChange}
      aria-label="Search notes"
    />
  );
}
