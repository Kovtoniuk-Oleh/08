'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  console.error(error); // для дебагу

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
      <button onClick={reset} style={{ marginTop: 10 }}>
        Try again
      </button>
    </div>
  );
}
