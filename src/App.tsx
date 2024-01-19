import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import type { RootState } from './redux/store.ts';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, test } from './redux/slices/filterSlice.ts';

export const AppContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(increment())}>
        Increment
      </button>
      <button aria-label="Decrement value" onClick={() => dispatch(test())}>
        Test
      </button>
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
