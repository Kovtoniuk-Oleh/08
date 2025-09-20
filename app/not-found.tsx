import type { Metadata } from 'next';
import Link from 'next/link';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found | NoteHub',
  description: "Oops! The page you're looking for doesn't exist. Create or share a new note with NoteHub.",
  openGraph: {
    title: 'Page Not Found | NoteHub',
    description: "Oops! The page you're looking for doesn't exist. Create or share a new note with NoteHub.",
    siteName: 'NoteHub',
    type: 'website',
    url: 'https://your-vercel-app.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Share Notes Instantly Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found | NoteHub',
    description: "Oops! The page you're looking for doesn't exist. Create or share a new note with NoteHub.",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Share Notes Instantly Online',
      },
    ],
    creator: 'github.com/Kovtoniuk-Oleh',
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className={css.link}>
        ← Back to Home
      </Link>
    </main>
  );
}
