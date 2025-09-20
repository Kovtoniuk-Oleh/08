'use client';

import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p className={css.text}>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>
            Developer:{' '}
            <a href="https://github.com/Kovtoniuk-Oleh" target="_blank" rel="noopener noreferrer">
              Kovtoniuk-Oleh
            </a>
          </p>
          <p>
            Contact us: <a href="mailto:kovtoniuk.oleh@gmail.com">kovtoniuk.oleh@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
