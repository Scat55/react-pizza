import styles from '../Search/Search.module.scss';

function Search() {
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="512"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg">
        <title />
        <path d="M464,428,339.92,303.9a160.48,160.48,0,0,0,30.72-94.58C370.64,120.37,298.27,48,209.32,48S48,120.37,48,209.32s72.37,161.32,161.32,161.32a160.48,160.48,0,0,0,94.58-30.72L428,464ZM209.32,319.69A110.38,110.38,0,1,1,319.69,209.32,110.5,110.5,0,0,1,209.32,319.69Z" />
      </svg>
      <input
        type="text"
        placeholder="Поиск пиццы..."
        className={styles.input}
      />
    </div>
  );
}

export default Search;
