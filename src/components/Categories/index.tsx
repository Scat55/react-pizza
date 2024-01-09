import React from 'react';

// Создаем интерфейс описывающий категории пицц
interface Categories {
	id: number;
	name: string;
}

function Categories() {
	// Создаем массив объектов с категориями пицц
	const categories: Categories[] = [
		{ id: 0, name: 'Все' },
		{ id: 1, name: 'Мясные' },
		{ id: 2, name: 'Вегетарианская' },
		{ id: 3, name: 'Гриль' },
		{ id: 4, name: 'Острые' },
		{ id: 5, name: 'Закрытые' },
	];
	// Создаем state для хранения состояния активной категории
	const [activeCategory, setActiveCategory] = React.useState(0);

	// Функция приравнивает число к id категории
	const changeCategoryAfterClick = (categoryId: number) => {
		setActiveCategory(categoryId);
	};
	return (
		<div className='categories'>
			<ul>
				{/* Делаем перебор по массиву */}
				{categories.map(category => (
					// Создаем тег li с классом "active" если состояние(activeCategory равна id конкретного элемента )
					<li
						className={activeCategory === category.id ? 'active' : ''}
						// По клику меняем id
						onClick={() => changeCategoryAfterClick(category.id)}
						key={category.id}
					>
						{/* Выводим название пиццы */}
						{category.name}
					</li>
				))}
			</ul>
		</div>
	);
}
export default Categories;
