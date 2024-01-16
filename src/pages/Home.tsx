import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
// import axios from 'axios';
import Skeleton from '../components/PizzaBlock/Skeleton';

interface Search {
  searchValue: string;
}

function Home({ searchValue }: Search) {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // State Categories -> Function in the Category component
  const [categoryId, setCategoryId] = React.useState(0);
  // State Sort -> Function in the Sort component
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  // Делаем запрос на сервер
  // С помощью параметра search мы делаем запрос на сервер, и тем самым получается поиск
  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    fetch(
      `https://65a56f1352f07a8b4a3f1aa3.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

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
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort sortValue={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
    </div>
  );
}

export default Home;
