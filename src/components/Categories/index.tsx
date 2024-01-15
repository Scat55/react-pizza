// Создаем интерфейс описывающий категории пицц
interface Categories {
  id: number;
  name: string;
}

// Создаем интрефейс Props
interface Props {
  value: number;
  onClickCategory: (id: number) => void;
}

function Categories({ value, onClickCategory }: Props) {
  // Создаем массив объектов с категориями пицц
  const categories: Categories[] = [
    { id: 0, name: 'Все' },
    { id: 1, name: 'Мясные' },
    { id: 2, name: 'Вегетарианская' },
    { id: 3, name: 'Гриль' },
    { id: 4, name: 'Острые' },
    { id: 5, name: 'Закрытые' },
  ];

  return (
    <div className="categories">
      <ul>
        {/* Делаем перебор по массиву */}
        {categories.map((category) => (
          // Создаем тег li с классом "active" если состояние(activeCategory равна id конкретного элемента )
          <li
            className={value === category.id ? 'active' : ''}
            // По клику меняем id
            onClick={() => onClickCategory(category.id)}
            key={category.id}>
            {/* Выводим название пиццы */}
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
