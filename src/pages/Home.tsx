import React from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import axios from 'axios';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { AppContext } from '../App.tsx';
import type { RootState } from '../redux/store.ts';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice.ts';
import qs from 'qs';
import {useNavigate} from 'react-router-dom'


function Home() {
  const navigate = useNavigate()
  // const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  //
  // const sortType = useSelector(
  //   (state: RootState) => state.filter.sort.sortProperty,
  // );

  const { categoryId, sort, pageCount } = useSelector(
    (state: RootState) => state.filter,
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const sortType = sort.sortProperty;

  const dispatch = useDispatch();

  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  // Делаем запрос на сервер
  // С помощью параметра search мы делаем запрос на сервер, и тем самым получается поиск
  const fetchPizzas = () => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://65a56f1352f07a8b4a3f1aa3.mockapi.io/pizzas?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then(({ data }) => {
        setItems(data);
        setIsLoading(false);
      });
  }
  // Если был первый рендер, то преверяем URL-параметры и сохраняем в Redux
  React.useEffect(() => {
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(setFilters({
        ...params,
        sort
      }));
      isSearch.current = true
    }
  }, [])



  React.useEffect(() => {
    window.scrollTo(0, 0);
    if(isSearch.current){
      fetchPizzas();
    }
    isSearch.current = true
  }, [categoryId, sortType, searchValue, pageCount]);

  // Передаем параметры в URL
  React.useEffect(() => {
    if(isMounted.current){
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        pageCount
      });
      navigate(`?${queryString}`)
    }
    isMounted.current  = true
  }, [categoryId, sortType, pageCount])



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

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };
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
      <Pagination currentPage={pageCount} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
