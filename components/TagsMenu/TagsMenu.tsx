'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tags } from '../../types/note';
import css from './TagsMenu.module.css';

interface TagsMenuProps {
  categories: Tags;
}

const TagsMenu = ({ categories }: TagsMenuProps) => {
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={() => setIsNotesOpen(!isNotesOpen)}>
        Notes {isNotesOpen ? '▾' : '▴'}
      </button>

      <ul className={`${css.menuList} ${isNotesOpen ? css.menuListOpen : ''}`}>
        {categories.map((category) => (
          <li key={category} className={css.menuItem}>
            <Link
              href={'/notes/filter/' + category}
              scroll={false}
              className={css.menuLink}
              onClick={() => setIsNotesOpen(false)}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsMenu;
