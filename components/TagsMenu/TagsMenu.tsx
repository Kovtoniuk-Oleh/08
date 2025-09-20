// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Tags } from '../../types/note';
// import css from './TagsMenu.module.css';

// interface TagsMenuProps {
//   categories: Tags;
// }

// const TagsMenu = ({ categories }: TagsMenuProps) => {
//   const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

//   return (
//     <div className={css.menuContainer}>
//       <button className={css.menuButton} onClick={() => setIsNotesOpen(!isNotesOpen)}>
//         Notes {isNotesOpen ? '▾' : '▴'}
//       </button>

//       <ul className={`${css.menuList} ${isNotesOpen ? css.menuListOpen : ''}`}>
//         {categories.map((category) => (
//           <li key={category} className={css.menuItem}>
//             <Link
//               href={'/notes/filter/' + category}
//               scroll={false}
//               className={css.menuLink}
//               onClick={() => setIsNotesOpen(false)}
//             >
//               {category}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TagsMenu;

'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Ideas', 'Shopping'];

const TagsMenu = () => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsNotesOpen(!isNotesOpen)}
        aria-expanded={isNotesOpen}
        aria-controls="tags-menu-list"
      >
        Notes {isNotesOpen ? '▾' : '▴'}
      </button>

      <ul id="tags-menu-list" className={`${css.menuList} ${isNotesOpen ? css.menuListOpen : ''}`}>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={tag === 'All' ? '/notes/filter/All' : `/notes/filter/${tag}`}
              scroll={false}
              className={css.menuLink}
              onClick={() => setIsNotesOpen(false)}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsMenu;
