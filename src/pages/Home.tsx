import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import axios from 'axios';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // State Categories
  const [categoryId, setCategoryId] = React.useState(0);
  // State Sort
  const [sortType, setSortType] = React.useState(0);

  // Делаем запрос на сервер
  React.useEffect(() => {
    setIsLoading(true);
    const response = async () => {
      await axios
        .get(
          `https://65a56f1352f07a8b4a3f1aa3.mockapi.io/pizzas?category=${categoryId}`,
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0);
    };
    response();
  }, [categoryId]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => (
              <Skeleton key={index} />
            ))
          : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </div>
  );
}

export default Home;
