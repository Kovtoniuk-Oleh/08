import css from './Loading.module.css';

const Loading = () => {
  return (
    <div className={css.container} role="status" aria-live="polite">
      <p className={css.text}>
        Loading<span className={css.dots}>...</span>
      </p>
    </div>
  );
};

export default Loading;
