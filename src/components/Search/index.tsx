import styles from '../Search/Search.module.scss';

interface Search {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

function Search({ searchValue, setSearchValue }: Search) {
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
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
        type="text"
        placeholder="Поиск пиццы..."
        className={styles.input}
      />

      {searchValue && (
        <svg
          onClick={() => setSearchValue('')}
          className={styles.clear}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
}

export default Search;
