import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import axios from 'axios';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { AppContext } from '../App.tsx';
import type { RootState } from '../redux/store.ts';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice.ts';

function Home() {
  // const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  //
  // const sortType = useSelector(
  //   (state: RootState) => state.filter.sort.sortProperty,
  // );

  const { categoryId, sort } = useSelector((state: RootState) => state.filter);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const sortType = sort.sortProperty;

  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  // State для пагинации
  const [currentPage, setCurrentPage] = React.useState(1);

  // Делаем запрос на сервер
  // С помощью параметра search мы делаем запрос на сервер, и тем самым получается поиск
  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://65a56f1352f07a8b4a3f1aa3.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then(({ data }) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  // Прежде чем рендерить пиццы, фильтруем их. В итоге получаем функционал поиска
  // Такой вариант подходит для статики. То есть когда данных не много и они не будут добаляться
  // const pizzas = items
  //   .filter((element) => {
  //     return element.title.toLowerCase().includes(searchValue.toLowerCase());
  //   })
  //   .map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => onChangeCategory(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
