import css from './LayoutNotes.module.css';

interface LayoutNotesProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const LayoutNotes = ({ children, sidebar }: LayoutNotesProps) => {
  return (
    <section className={css.container} aria-label="Notes layout">
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
    </section>
  );
};

export default LayoutNotes;
