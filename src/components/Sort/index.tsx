import React from 'react';

import type { RootState } from '../../redux/store.ts';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../../redux/slices/filterSlice.ts';

interface NameSorted {
  name: string;
  sortProperty: string;
}

const sortList: NameSorted[] = [
  { name: 'популярности (убыванию)', sortProperty: 'rating' },
  { name: 'популярности (возрастанию)', sortProperty: '-rating' },
  { name: 'цене (убыванию)', sortProperty: 'price' },
  { name: 'цене (возрастанию)', sortProperty: '-price' },
  { name: 'алфавиту (Яя-Аа)', sortProperty: 'title' },
  { name: 'алфавиту (Аа-Яя)', sortProperty: '-title' },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);

  // Открытие и закрытие попапа
  const [isVisiblePopup, setIsVisiblePopup] = React.useState(false);

  const sortedListItem = (obj: object) => {
    dispatch(setSort(obj));
    setIsVisiblePopup(!isVisiblePopup);
  };
  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>
          {/* Показываем название сортировке в зависимости от выбора пользователя */}
          {sort.name}
        </span>
      </div>
      {isVisiblePopup && (
        <div className="sort__popup">
          <ul>
            {/* Рендер листа с названием сортировок */}
            {sortList.map((obj, idx) => (
              <li
                key={idx}
                onClick={() => sortedListItem(obj)}
                className={
                  sort.sortProperty == obj.sortProperty ? 'active' : ''
                }>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
