import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import axios from 'axios';
import Skeleton from '../components/PizzaBlock/Skeleton';
function Home() {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const response = async () => {
			await axios.get('https://19c886375be11f9f.mokky.dev/pizzas').then(res => {
				setItems(res.data);
				setIsLoading(false);
			});
			window.scrollTo(0, 0);
		};
		response();
	}, []);
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map(obj => <PizzaBlock {...obj} key={obj.id} />)}
			</div>
		</div>
	);
}
export default Home;
