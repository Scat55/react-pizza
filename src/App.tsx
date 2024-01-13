import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import axios from 'axios';

function App() {
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		const response = async () => {
			await axios.get('https://19c886375be11f9f.mokky.dev/pizzas').then(res => {
				setItems(res.data);
			});
		};
		response();
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{/*  /> */}
						{items.map(pizza => (
							<PizzaBlock {...pizza} key={pizza.id} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
